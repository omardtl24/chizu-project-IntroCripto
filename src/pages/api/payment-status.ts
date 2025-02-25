// /pages/api/payment-status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import MercadoPago, { Payment } from 'mercadopago';

const mp = new MercadoPago({
  accessToken: "APP_USR-3524539752788201-012515-cdf91f454b8edc4ac8621478a879ca14-1107696534",
});

const paymentClient = new Payment(mp);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('GET /api/payment-status endpoint called');
  try {
    const { paymentId } = req.query;
    if (!paymentId) {
      return res.status(400).json({ error: 'PaymentId is missing' });
    }

    // In v2, the method is called with an object { id: ... }
    const response = await paymentClient.get({ id: paymentId as string });
    return res.status(200).json({ payment: response });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
