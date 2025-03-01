import { Access, CollectionConfig } from "payload/types";
import payload from 'payload';  

const adminOrOwnerReadAccess: Access = ({ req }) => {
    const user = req.user;

    // Los administradores pueden ver todas las campañas
    if (user.role === 'admin') {
        return true;
    }

    // Los usuarios solo pueden ver campañas propias
    return {
        user: {
            equals: user.id,
        },
    };
};

export const Campaigns: CollectionConfig = {
    slug: 'campaigns',
    labels: { singular: 'Campaña', plural: 'Campañas' },
    admin: {
        useAsTitle: 'title',
        description: 'Gestión de campañas creadas por los usuarios.',
        hideAPIURL: true
    },

    hooks: {
        beforeChange: [
            async ({ data, req, operation }) => {
                // Asignar automáticamente el usuario autenticado si no está definido
                if (!data.user && req.user) {
                    data.user = req.user.id;
                }
    
                // Limitar a una campaña por usuario en la operación de creación
                if (operation === 'create') {
                    const existingCampaigns = await payload.find({
                        collection: 'campaigns',
                        where: {
                            user: {
                                equals: req.user.id,
                            },
                        },
                    });
    
                    if (existingCampaigns.totalDocs > 0) {
                        throw new Error('Solo puedes crear una campaña.');
                    }
                }

                if (data.id || data._id) {
                    const tiersCount = await req.payload.find({
                        collection: 'tiers',
                        where: {
                            campaign: {
                                equals: data.id || data._id,
                            },
                        },
                        limit: 0,
                    });

                    if (tiersCount.totalDocs > 3) {
                        throw new Error('La campaña no puede tener más de 3 tiers.');
                    }
                }
    
                return data;
            },
        ],
    },
    

    access: {
        create: ({ req }) => !!req.user,        // Permitir que cualquier usuario autenticado cree campañas
        read: adminOrOwnerReadAccess,               // Solo el creador o admin puede ver campañas
        update: adminOrOwnerReadAccess,             // Solo el creador o admin puede actualizar campañas
        delete: ({ req }) => req.user.role === 'admin',             // Solo el creador o admin puede eliminar campañas
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
                hidden: true
            },
        },
        {
            name: 'category',
            label: 'Categoría',
            type: 'relationship',
            relationTo: 'categorycampaign',
            required: true,
            hasMany: true
        },
        {
            name: 'bannerImage',
            label: 'Imagen de Banner',
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
            label: 'Tiers de Suscripción',
            type: 'relationship',
            relationTo: 'tiers',
            required: false,
            hasMany: true,
            admin: {
                description: 'Define los diferentes niveles de suscripción para esta campaña.',
            },   
            validate: (tiers) => {
                if (tiers && tiers.length > 3) {
                    return 'La campaña no puede tener más de 3 tiers.';
                }
                return true;
            },
        },
              
    ],
};
