import express from 'express'
import { WebhookRequest } from './server'
import { stripe } from './lib/stripe'
import type Stripe from 'stripe'

import { getPayloadClient } from './getPayload'
import { Product, Order } from './payload-types'

import nodemailer from 'nodemailer'
import { ReceiptEmailHtml } from './components/email/Receipt'


// 1. Validar que el request provenga de Stripe unicamenta
// 2. Actulizar _isPaid en la orden asociada
// 3. Enviar un correo con el recibo de la compra


export const stripeWebhookHandler = async (
    req: express.Request,
    res: express.Response
) => {

    // 1.
    const webhookRequest = req as any as WebhookRequest
    const body = webhookRequest.rawBody
    const signature = req.headers['stripe-signature'] || ''

    let event
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        )
    } catch (err) {
        return res
            .status(400)
            .send(
                `Webhook Error: ${err instanceof Error
                    ? err.message
                    : 'Unknown Error'
                }`
            )
    }

    const session = event.data
        .object as Stripe.Checkout.Session

    if (
        !session?.metadata?.userId ||
        !session?.metadata?.orderId
    ) {
        return res
            .status(400)
            .send(`Webhook Error: No user present in metadata`)
    }

    // 2.
    if (event.type === 'checkout.session.completed') {
        const payload = await getPayloadClient()

        const { docs: users } = await payload.find({
            collection: 'users',
            where: {
                id: {
                    equals: session.metadata.userId,
                },
            },
        })

        const [user] = users

        if (!user)
            return res
                .status(404)
                .json({ error: 'No such user exists.' })

        const { docs: orders } = await payload.find({
            collection: 'orders',
            depth: 2,
            where: {
                id: {
                    equals: session.metadata.orderId,
                },
            },
        })

        const [order] = orders

        if (!order)
            return res
                .status(404)
                .json({ error: 'No such order exists.' })

        await payload.update({
            collection: 'orders',
            data: {
                _isPaid: true,
            },
            where: {
                id: {
                    equals: session.metadata.orderId,
                },
            },
        })

        // 3.
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com', //secure : true,
                port: 587,
                auth: {
                    user: 'oilstockmanager@gmail.com',
                    pass: process.env.EMAIL_KEY,
                },
            });

            let mailOptions = {
                from: 'UwUteca',
                to: user.email,
                subject: 'Gracias por tu Compra :3',
                html: ReceiptEmailHtml({
                    date: new Date(),
                    email: user.email,
                    orderId: session.metadata.orderId,
                    products: order.products as Product[],
                    quantities: order.quantities ?? [],
                    Total: order.total
                }),
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    res.status(200).json({ data: info.response });
                }
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    return res.status(200).send()

}
