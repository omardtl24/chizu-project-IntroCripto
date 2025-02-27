"use client"
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CampaignClientComponent from './campaign-client';
import { Tier } from "@/payload-types";
import { ButtonPusheable } from '../button_pusheable';

interface DialogWrapperProps {
    tier: Tier;
    user: any;
    bannerImageUrl: string;
}

export const DialogWrapper = ({ tier, user, bannerImageUrl }: DialogWrapperProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <ButtonPusheable className="w-full py-3 rounded-xl bg-[#007373] hover:bg-[#009c9c] text-white transition-all">
                    Seleccionar Plan
                </ButtonPusheable>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Suscribirse a {tier.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Si desea continuar, porfavor seleccione en Aceptar para cargar MercadoPago.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <CampaignClientComponent
                    user={user}
                    bannerImageUrl={bannerImageUrl}
                    tier={tier}
                    onClose={() => setIsOpen(false)}
                />
            </AlertDialogContent>
        </AlertDialog>
    );
};
