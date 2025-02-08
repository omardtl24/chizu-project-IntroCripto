"use client"

import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import MercadoPago from "mercadopago"
import { ReceiptEmailHtml } from './components/email/Receipt'
import { getPayloadClient } from '@/getPayload'
interface PaymentStatusProps {
    orderEmail: string
    orderId: string
    paymentId: string
    isPaid: boolean
}
//maybe poner otro parametro de paymentId
const PaymentStatus = ({orderEmail, orderId, paymentId, isPaid}: PaymentStatusProps) => {
    //const payload = await getPayloadClient()
    const router = useRouter()
    // 1. Llamar el endpoint adicional en la carpeta api
    const [payment, setPayment] = useState<PaymentStatusProps | null>(null);
    useEffect(() => {
        if (paymentId) {
            fetch(`/api/payment-status?paymentId=${paymentId}`)
                .then((res) => res.json())
                .then((data) => {
                    // data.payment vendrá con la forma que definiste en el endpoint
                    setPayment(data.payment);
                })
                .catch(console.error);
        }
    }, [paymentId]);    
    console.log("Esto es la respuesta de la api: ",payment)
    // 2. Actualizar ispaid en la orden asociada con la respuesta del endpoint
    /*
    if (payment && payment.status === 'approved') {
        await payload.update({
            collection: 'orders',
            data: {
                ?: parseInt(Array.isArray(paymentId) ? paymentId[0] : paymentId),
                preferenceId: Array.isArray(preferenceId) ? preferenceId[0] : preferenceId,
            },
            where: {
                id: {
                    equals: orderId,
                },
            },
        })}            
    }
    // 3. mandar el correo
    
    const {data} = trpc.payment.pollOrderStatus.useQuery({orderId}, {
        enabled: isPaid === false,
        refetchInterval: (data) => (data?.isPaid ? false: 1500)
    }) 
    

    useEffect(() => {
        if(data?.isPaid) router.refresh()
    }, [data?.isPaid, router])*/
    // agregar uso de send email con el componente importado ReceiptEmailHtml (para referencia ver auth-router.tsx)
    return <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
        <div>
            <p className="font-medium text-gray-900">
                Confirmación en:
            </p>
            <p>{orderEmail}</p>
        </div>

        <div>
            <p className="font-medium text-gray-900">
                Estado de la Orden:
            </p>
            <p className={isPaid ? 'text-green-600' : ''}>
                {isPaid ? "Pago Exitoso" : "Pendiente de Pago"}
            </p>
        </div>
    </div>
}


export default PaymentStatus
