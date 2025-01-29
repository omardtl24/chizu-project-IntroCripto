import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
    if (user.role === 'admin') {
        return true;
    }

    return {
        user: { equals: user?.id },
    };
};

export const Campaigns: CollectionConfig = {
    slug: 'campaigns',
    labels: { singular: 'Campaña', plural: 'Campañas' },
    admin: {
        useAsTitle: 'title',
        description: 'Gestión de campañas creadas por los usuarios.',
    },

    access: {
        create: ({ req }) => !!req.user,
        read: ({ req }) => !!req.user,
        update: yourOwn,
        delete: ({ req }) => req.user?.role === 'admin',
    },

    fields: [
        {
            name: 'title',
            label: 'Título de la campaña',
            type: 'text',
            required: true,
            validate: (value) => {
                if (!value) return 'El título de la campaña es obligatorio.';
                if (value.length < 5) return 'El título debe tener al menos 5 caracteres.';
                return true; // Validación exitosa.
            },
        },
        {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            required: true,
            validate: (value) => {
                if (!value) return 'Debe proporcionar una descripción para la campaña.';
                if (value.length < 20) return 'La descripción debe tener al menos 20 caracteres.';
                return true;
            },
        },
        {
            name: 'user',
            label: 'Creador',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'category',
            label: 'Categoría',
            type: 'relationship',
            relationTo: 'categorycampaign',
            required: true,
        },
        {
            name: 'bannerImage',
            label: 'Imagen de Título',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'startDate',
            label: 'Fecha de Inicio',
            type: 'date',
            defaultValue: () => new Date().toISOString(),
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'dd/MM/yyyy',
                },
                readOnly: true,
            },
        },
        {
            name: 'status',
            label: 'Estado',
            type: 'select',
            options: [
                { label: 'Suspendida', value: 'suspendida' },
                { label: 'Activa', value: 'activa' },
                { label: 'Finalizada', value: 'finalizada' },
            ],
            defaultValue: 'activa',
            required: true,
        },
        {
            name: 'tiers',
            label: 'Tiers de suscripción',
            type: 'relationship',
            relationTo: 'tiers',
            hasMany: true,
            admin: {
                description: 'Define los diferentes niveles de suscripción para esta campaña.',
            },
            validate: (tiers) => {
                if (!tiers || tiers.length < 1) return 'La campaña debe tener al menos un tier.';
                if (tiers.length > 3) return 'La campaña no puede tener más de 3 tiers.';
                return true;
            },
        }
              
    ],
};
