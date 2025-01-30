import { CollectionConfig } from "payload/types";


export const CategoryCampaign: CollectionConfig = {
    slug: 'categorycampaign',
    labels: {singular: 'Categoria de Campaña', plural: 'Categorias de Campaña'},

    admin: { 
        useAsTitle: 'name' ,
        hidden : ({user}) => user.role !== 'admin',
        description: 'Categorias y Generos de las Campañas.',
        hideAPIURL: true,
    },

    access : {
        create: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
    },

    fields: [
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            required: true,
        },

        {
            name: 'description',
            label: 'Descripcion',
            type: 'textarea',
            required: false,
        },

    ]
}