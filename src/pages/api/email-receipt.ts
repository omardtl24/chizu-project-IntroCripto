import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ReceiptEmailHtml } from "@/components/email/Receipt";
import { Order, Product, User } from "@/payload-types";

export async function POST(req: Request) {
    try {
        console.log('POST /api/email-receipt endpoint called');
        const { user, order, orderId } = await req.json();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "chizugamessocial@gmail.com",
                pass: process.env.EMAIL_KEY,
            },
        });
        console.log('se crea el transporter');

        let mailOptions = {
            from: "Chizu",
            to: user.email as string,
            subject: "Gracias por tu Compra :3",
            html: ReceiptEmailHtml({
                date: new Date(),
                email: user.email as string,
                orderId,
                products: order.products as Product[],
                Total: order.total as number,
            }),
        };
        console.log('se configura el email');

        await transporter.sendMail(mailOptions);
        console.log('se envía el email');

        return NextResponse.json({ success: true });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error sending email:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        } else {
            console.error("Error sending email:", error);
            return NextResponse.json({ success: false, error: "Unknown error" }, { status: 500 });
        }
    }
}
