"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MercadoPago from "mercadopago";
import { ReceiptEmailHtml } from "./components/email/Receipt";
import { getPayloadClient } from "@/getPayload";
import { boolean } from "zod";

interface PaymentStatusProps {
    orderEmail: string;
    orderId: string;
    paymentId: string;
    isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, paymentId, isPaid }: PaymentStatusProps) => {
    const router = useRouter();

    const [data, setData] = useState(null);
    const [PapiYaExisto, setPapiYaExisto] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    console.log(data);

    useEffect(() => {
        if (paymentId) {
            const url = new URL("/api/payment-status", window.location.origin);
            url.searchParams.append("paymentId", paymentId);

            fetch(url.toString())
                .then((res) => {
                    console.log("estoy asi", res.ok);
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("estoy asi v3", data.payment.status);
                    setPapiYaExisto(data.payment.status == "approved" ? true : false);
                })
                .catch((error) => {
                    setError("Failed to fetch payment status");
                    console.error("Error fetching payment status:", error);
                });
        }
    }, [paymentId]);

    return (
        <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
                <p className="font-medium text-gray-900">Confirmación en:</p>
                <p>{orderEmail}</p>
            </div>

            <div>
                <p className="font-medium text-gray-900">EErrorrr:</p>
                <p>{PapiYaExisto}</p>

                <div>
                    <p className="font-medium text-gray-900">Estado de la Orden:</p>
                    <p className={PapiYaExisto ? "text-green-600" : ""}>
                        {PapiYaExisto ? "Pago Exitoso" : "Pendiente de Pago"}
                    </p>
                </div>
            </div>

            {error && (
                <div>
                    <p className="text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentStatus;
