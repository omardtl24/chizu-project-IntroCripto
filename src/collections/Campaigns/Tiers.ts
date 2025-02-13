import { CollectionConfig, Access} from "payload/types";

const adminOrOwnerTierReadAccess: Access = ({ req }) => {
    const user = req.user;

    if (user.role === 'admin') {
        return true; 
    }


    return {
        'campaign.user': {
            equals: user.id,
        },
    };
};


export const Tiers: CollectionConfig = {
    slug: 'tiers',
    labels: { singular: 'Tier', plural: 'Tiers' },
    admin: {
        useAsTitle: 'title',
        description: 'Gestión de niveles de suscripción para campañas.',
        hideAPIURL: true
    },

    hooks: {
        beforeChange: [
            async ({ data, req, operation }) => {
                if (operation === 'create') {
                    const campaignId = data.campaign;

                    // Contar los tiers existentes para la campaña
                    const existingTiers = await req.payload.find({
                        collection: 'tiers',
                        where: {
                            campaign: {
                                equals: campaignId,
                            },
                        },
                        limit: 0,
                    });

                    if (existingTiers.totalDocs >= 3) {
                        throw new Error('No puedes agregar más de 3 tiers a esta campaña.');
                    }
                }

                return data;
            },
        ],
    },

    access: {
        create: adminOrOwnerTierReadAccess,  
        read: adminOrOwnerTierReadAccess,    
        update: adminOrOwnerTierReadAccess,                  
        delete: ({ req }) => req.user?.role === 'admin',                  
    },

    fields: [
        {
            name: 'title',
            label: 'Título del Tier',
            type: 'text',
            required: true,
            validate: (value) => {
                if (!value) return 'El título del tier es obligatorio.';
                if (value.length < 3) return 'El título debe tener al menos 3 caracteres.';
                return true;
            },
        },
        {
            name: 'price',
            label: 'Precio',
            type: 'number',
            required: true,
            validate: (value) => {
                if (value == null) return 'El precio es obligatorio.';
                if (value <= 0) return 'El precio debe ser mayor que 0.';
                return true;
            },
            admin: {
                description: 'Introduce el precio del tier en la moneda predeterminada.',
                
            },
        },
        {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            required: true,
            validate: (value) => {
                if (!value) return 'Debe proporcionar una descripción para el tier.';
                if (value.length < 10) return 'La descripción debe tener al menos 10 caracteres.';
                return true;
            },
        },
        {
            name: 'features',
            label: 'Características',
            type: 'array',
            labels: {
                singular: 'Característica',
                plural: 'Características',
            },
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                    required: true,
                    label: 'Característica',
                },
            ],
            admin: {
                description: 'Lista de características incluidas en este tier.',
            },
        },
        {
            name: 'campaign',
            label: 'Campaña',
            type: 'relationship',
            relationTo: 'campaigns',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'rewards',
            label: 'Recompensas del Tier',
            type: 'array',
            minRows: 0,
            maxRows: 5,
            required: false,
            labels: {
                singular: 'Recompensa', plural: 'Recompensas',
            },
            fields: [
                { name: 'reward', type: 'upload', relationTo: 'rewards', required: false, }
            ],
        },
    ],
};
