import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { ReceiptEmailHtml } from '@/components/email/Receipt';
import { Order, Product } from '@/payload-types';
import { getPayloadClient } from '../../getPayload';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('GET /api/email-receipt endpoint called');

    try {
        // Obtener el cliente de PayLoad
        const payload = await getPayloadClient()
        // Extraer los parámetros de la query correctamente
        const { orderEmail, orderId } = req.query;

        // Validar que los valores sean strings (req.query puede devolver arrays)
        
        const email_ = Array.isArray(orderEmail) ? orderEmail[0] : orderEmail;
        const order_Id = Array.isArray(orderId) ? orderId[0] : orderId;

        const { docs: orders } = await payload.find({
            collection: 'orders',
            depth: 2,
            where: {
                id: {
                    equals: order_Id,
                },
            },
        })

        const [order] = orders
        
        // Validar si los parámetros están presentes
        if ( !email_ || !order_Id || !orders) {
            console.error('Missing required parameters');
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        
        console.log("Información en la api: ")
        //console.log('Parsed data:', { email_, order_Id, parsedProducts });
        
        //#region EMAIL HANDLER
        let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com', //secure : true,
                port: 587,
                auth: {
                    user: 'chizugamessocial@gmail.com',
                    pass: process.env.EMAIL_KEY,
                },
        });

        console.log('Transporter created');
        let mailOptions = {
            from: 'Chizu',
            to: email_ as string,
            subject: 'Gracias por tu Compra :3',
            html: ReceiptEmailHtml({
                date: new Date(),
                email: email_ as string,
                orderId: order_Id as string,
                products: order.products as Product[],
                Total: order.total as number,
            }),
        };
        console.log('Email configured');

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ data: info.response });
            }
        });

        console.log('Email sent');
        //#endregion 

    } catch (error) {
        res.status(500).json({ error });
    }

}
