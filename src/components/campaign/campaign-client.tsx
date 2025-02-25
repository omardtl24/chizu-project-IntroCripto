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
    onClose: () => void;
}

initMercadoPago('APP_USR-93cf7930-b88d-4a34-84c2-760b75083b99');
const CampaignClientComponent: React.FC<ClientComponentProps> = ({ user, bannerImageUrl, tier, onClose }) => {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean> (false)

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
        setIsLoading(true)
        const id = await createPreference(tier);
        if (id) {
            setPreferenceId(id);
        }
        setIsLoading(false)
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex gap-4 justify-end">
                <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="flex-1"
                >
                    Cancelar
                </Button>
                <Button 
                    variant="default" 
                    onClick={() => handleBuy(tier)}
                    isLoading={isLoading}
                    className="flex-1 flex items-center justify-center"
                >
                    Aceptar
                </Button>
            </div>
            
            {preferenceId && (
                
                    <Wallet 
                        initialization={{ preferenceId: preferenceId }} 
                        customization={{ texts: { valueProp: 'smart_option' } }} 
                    />
                
            )}
        </div>
    );
};

export default CampaignClientComponent;