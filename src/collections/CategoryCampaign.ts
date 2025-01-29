import { CollectionConfig } from "payload/types";


export const Category: CollectionConfig = {
    slug: 'categorycampaign',
    labels: {singular: 'Categoria', plural: 'Categorias'},

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