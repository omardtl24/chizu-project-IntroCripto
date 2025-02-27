"use client"

import { useEffect, useState } from 'react';
import { Tier } from "@/payload-types";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ClientComponentProps {
    user: any;
    bannerImageUrl: string;
    tier: Tier;
    onClose: () => void;
}

initMercadoPago('APP_USR-93cf7930-b88d-4a34-84c2-760b75083b99');

const CampaignClientComponent: React.FC<ClientComponentProps> = ({ user, bannerImageUrl, tier, onClose }) => {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // Función para crear la preferencia de pago
    const createPreference = async () => {
        try {
            const products = [
                {
                    user_id: user.id,
                    id: tier.id,
                    title: tier.title,
                    quantity: 1,
                    unit_price: tier.price,
                    picture_url: bannerImageUrl || "/default-banner.jpg",
                    isProduct: false,
                }
            ];

            const response = await fetch("/api/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(products),
            });

            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }

            const data = await response.json();
            const { id } = data;
            return id;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    // Función para iniciar la compra
    const handleBuy = async () => {
        setIsLoading(true);
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
        // Pequeño delay para asegurar que el preferenceId se establezca
        await new Promise(resolve => setTimeout(resolve, 250));
        setIsLoading(false);
    };

    // Efecto para iniciar el proceso automáticamente al montar el componente
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Efecto para iniciar la compra automáticamente cuando el componente esté montado
    useEffect(() => {
        if (isMounted) {
            handleBuy();
        }
    }, [isMounted]);

    return (
        <div className="flex flex-col w-full">
            <div className="flex gap-4 justify-end mb-4">
                <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                >
                    Cancelar
                </Button>
            </div>

            {isLoading ? (
                <Button className="w-full flex items-center justify-center" disabled={true}>
                    <Loader2 className='h-5 w-5 animate-spin mr-2 text-white' />
                    <span className="text-white font-medium">Cargando MercadoPago...</span>
                </Button>
            ) : preferenceId ? (
                <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: 'smart_option' } }}
                />
            ) : null}
        </div>
    );
};

export default CampaignClientComponent;