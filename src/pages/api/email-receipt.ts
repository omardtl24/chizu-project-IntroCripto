import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { ReceiptEmailHtml } from '@/components/email/Receipt';
import { Order, Product, User } from '@/payload-types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('POST /api/email-receipt endpoint called');
    try {
        const { user, order, orderId } = req.body;
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
}
