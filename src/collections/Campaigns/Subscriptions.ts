import { CollectionConfig, Access } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
    if (user.role === 'admin') {
        return true; 
    }

    return {
        user: { equals: user?.id }, 
    };
};

export const Subscriptions: CollectionConfig = {
    slug: 'subscriptions',
    labels: { singular: 'Suscripción', plural: 'Suscripciones' },
    admin: {
        useAsTitle: 'tier',  
        description: 'Gestión de las suscripciones a tiers de campañas.',
        hideAPIURL: true,
        hidden: () => true
    },

    access: {
        create: () => false,  
        read: yourOwn,                     
        update: ({ req }) => req.user?.role === 'admin',                  
        delete: () => false,                   
    },

    fields: [
        {
            name: 'user',
            label: 'Usuario',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
                readOnly: true,  
            },
        },
        {
            name: 'tier',
            label: 'Tier de Suscripción',
            type: 'relationship',
            relationTo: 'tiers',
            required: true,
        },
        {
            name: 'startDate',
            label: 'Fecha de Inicio',
            type: 'date',
            defaultValue: () => new Date().toISOString(),  // Fecha actual por defecto.
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'dd/MM/yyyy',
                },
            },
        },
        {
            name: 'status',
            label: 'Estado de la Suscripción',
            type: 'select',
            options: [
                { label: 'Activa', value: 'activa' },
                { label: 'Cancelada', value: 'cancelada' },
                { label: 'Expirada', value: 'expirada' },
            ],
            defaultValue: 'activa',
            required: true,
        },
    ],
};
