// /pages/api/payment-status.ts
import { NextApiRequest, NextApiResponse } from 'next'
import MercadoPago, { Payment } from 'mercadopago'

const mp = new MercadoPago({
  accessToken: process.env.MP_ACCESS_TOKEN || ''
})

const paymentClient = new Payment(mp)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('GET /api/payment-status SE LLAMO LA API DE MIERDA')
  try {
    const { paymentId } = req.query
    if (!paymentId) {
      return res.status(400).json({ error: 'Falta el paymentId' })
    }

    // Ojo: En la v2, el método se invoca con un objeto { id: ... }
    const response = await paymentClient.get({ id: paymentId as string })
    console.log('response', response)
    return res.status(200).json({ payment: response })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}
