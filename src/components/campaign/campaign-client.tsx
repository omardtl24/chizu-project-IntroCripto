"use client"

import { useState } from 'react';
import { Tier } from "@/payload-types";
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Button, buttonVariants } from "@/components/ui/button";



interface ClientComponentProps {
    user: any;
    bannerImageUrl: string;
    tier: Tier;
}

initMercadoPago('TEST-7dddc6b8-125e-4830-b457-5077f5c23b9d');
const CampaignClientComponent: React.FC<ClientComponentProps> = ({ user, bannerImageUrl, tier }) => {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    const createPreference = async (tier: Tier) => {
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
        }
    };

    const handleBuy = async (tier: Tier) => {
        console.log("Llegaste al handleby :)");
        const id = await createPreference(tier);
        if (id) {
            setPreferenceId(id);
        }
    };

    return (
        <>
            <Button variant="default" onClick={() => handleBuy(tier)}>
                Aceptar
            </Button>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
        </>
    );
};

export default CampaignClientComponent;
