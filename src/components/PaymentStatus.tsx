"use client";

import { trpc } from "@/trpc/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  paymentId: string;
  isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, paymentId, isPaid }: PaymentStatusProps) => {
  const { mutate: updateOrderStatus } = trpc.payment.updateOrderStatus.useMutation({
    onSuccess: async () => {
      toast.success("Su Orden ha sido actualizada con exito.");
    },
  });

  const [PapiYaExisto, setPapiYaExisto] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (paymentId) {
      const url = new URL("/api/payment-status", window.location.origin);
      url.searchParams.append("paymentId", paymentId);

      fetch(url.toString())
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          const isApproved = data.payment.status === "approved";
          setPapiYaExisto(isApproved);
          if (isApproved) {
            updateOrderStatus({ orderId });
          }
        })
        .catch((error) => {
          setError("Failed to fetch payment status");
          console.error("Error fetching payment status:", error);
        });
    }
  }, [paymentId, orderId, updateOrderStatus]);

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Confirmación en:</p>
        <p>{orderEmail}</p>
      </div>

      <div>

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
