import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../getPayload";
import type Stripe from "stripe";
import { stripe } from "../lib/stripe";

export const paymentRouter = router({

    //procedimiento que solo aquellos autorizados pueden ejecutar 
    createSession: privateProcedure.input(z.object({ products_info: z.array( z.tuple( [z.string(), z.number()] ) ) }))
    .mutation(async ({ ctx, input }) => {

        const { user } = ctx
        let { products_info } = input

        if (products_info.length === 0){
            throw new TRPCError({ code: 'BAD_REQUEST'})
        }

        const payload = await getPayloadClient()

        const { docs: products } = await payload.find({
            collection: 'products',
            where:{
                id:{
                    in: products_info.map( ([id, qty]) => id )
                },
            },
        })

        const valid_products = products.filter( (product) => Boolean(product.priceId) )
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

        const order = await payload.create({
            collection: 'orders',
            data: {
              _isPaid: false,
              products: valid_products.map((p) => p.id),
              user: user.id,

              quantities : valid_products.map( (product) => ({
                product_name: product.name,
                quantity: products_info.find( ([id, qty]) => id === product.id )?.[1] ?? 1,
                acc: product.price * ( products_info.find( ([id, qty]) => id === product.id )?.[1] ?? 1 ),
              })),

              total: valid_products.reduce( (acc, product) => {
                const qty = products_info.find( ([id, qty]) => id === product.id )?.[1] ?? 1;
                return acc + ( product.price * qty );
              }, 0 ),

            },
        })
        // payload.logger.info(order)

        await payload.update({
            collection : 'users', 
            id : user.id, 
            data : { 
                ordenes : ( (user.ordenes_hist ?? []).length + 1 ),
                ordenes_hist: [
                    ...( user.ordenes_hist?.map((ord) => typeof ord === 'object' ? ord.id : '') ?? [] ),
                    order.id
                ],
            }
        });

        valid_products.forEach( async (product) => {
            const qty = products_info.find( ([id, qty]) => id === product.id )?.[1] ?? 1
            line_items.push({
                price: product.priceId!,
                quantity: qty,
            });

            await payload.update({
                collection: 'products',
                id: product.id,
                data: { compras: (product.compras ?? 0) + qty },
            });
        })

        try{
            const stripeSession =
                await stripe.checkout.sessions.create({

                    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
                    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
                    payment_method_types: ['card'], // paypal no acepta 'cop'
                    mode: 'payment',
                    metadata: {
                        userId: user.id,
                        orderId: order.id,
                    },
                    shipping_address_collection: { allowed_countries: ['CO', 'MX', 'AR', 'CL', 'UY'] },
                    line_items,
            })

            return { url: stripeSession.url }
        } 
        catch (err){
            return { url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart?error=lastimosamente` }
        }

    }),
    
    pollOrderStatus: privateProcedure
    .input(z.object({orderId: z.string()}))
    .query(async({input}) => {
        const {orderId} = input

        const payload = await getPayloadClient()

        const {docs: orders} = await payload.find({
            collection: "orders",
            where: {
                id: {
                    equals: orderId
                }
            }
        })

        if(!orders.length) {
            throw new TRPCError({code: 'NOT_FOUND'})
        }

        const [order] = orders

        return { isPaid: order._isPaid}
    }),
})
