import { CollectionConfig, Access} from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
    if (user.role === 'admin') {
        return true;
    }

    return {
        user: { equals: user?.id },
    };
};


export const Tiers: CollectionConfig = {
    slug: 'tiers',
    labels: { singular: 'Tier', plural: 'Tiers' },
    admin: {
        useAsTitle: 'title',
        description: 'Gestión de niveles de suscripción para campañas.',
    },

    access: {
        create: ({ req }) => !!req.user,  
        read: ({ req }) => !!req.user,    
        update: yourOwn,                  
        delete: yourOwn,                  
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
            name: 'campaign',
            label: 'Campaña',
            type: 'relationship',
            relationTo: 'campaigns',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
