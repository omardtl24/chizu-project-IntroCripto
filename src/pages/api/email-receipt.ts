import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { ReceiptEmailHtml } from '@/components/email/Receipt';
import { Order, Product, User } from '@/payload-types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('GET /api/email-receipt endpoint called');

    try {
        // Extraer los parámetros de la query correctamente
        const { orderTotal, orderEmail, orderId, products } = req.query;

        // Validar que los valores sean strings (req.query puede devolver arrays)
        
        const order_Total = Array.isArray(orderTotal) ? orderTotal[0] : orderTotal;
        const email_ = Array.isArray(orderEmail) ? orderEmail[0] : orderEmail;
        const order_Id = Array.isArray(orderId) ? orderId[0] : orderId;
        
        // Validar si los parámetros están presentes
        if (!order_Total || !email_ || !order_Id || !products) {
            console.error('Missing required parameters');
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Parsear el JSON de `products`
        let parsedProducts;
        try {
            parsedProducts = JSON.parse(Array.isArray(products) ? products[0] : products);
        } catch (error) {
            console.error('Error parsing products:', error);
            return res.status(400).json({ error: 'Invalid JSON format for products' });
        }

        console.log('Parsed data:', { email_, order_Id, parsedProducts });

        //#region EMAIL HANDLER
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
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
                products: parsedProducts as Product[],
                Total: parseFloat(order_Total),
            }),
        };
        console.log('Email configured');

        await transporter.sendMail(mailOptions);
        console.log('Email sent');
        //#endregion 

        return res.status(200).json({ success: true, orderEmail: email_, orderId, products: parsedProducts });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    

    /*
    try {
        //const { user, order, orderId } = req.body;
        console.log('Request body:', req.body);
        if (!user || !order || !orderId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'chizugamessocial@gmail.com',
                pass: process.env.EMAIL_KEY,
            },
        });
        console.log('Transporter created');

        let mailOptions = {
            from: 'Chizu',
            to: user.email as string,
            subject: 'Gracias por tu Compra :3',
            html: ReceiptEmailHtml({
                date: new Date(),
                email: user.email as string,
                orderId,
                products: order.products as Product[],
                Total: order.total as number,
            }),
        };
        console.log('Email configured');

        await transporter.sendMail(mailOptions);
        console.log('Email sent');

        return res.status(200).json({ success: true });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
    
    return res.status(200).json({ success: true });   
    */

}
