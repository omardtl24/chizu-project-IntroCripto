import { Product } from "../../payload-types"
import { BeforeChangeHook } from "payload/dist/globals/config/types"
import { CollectionConfig } from "payload/types"
import { stripe } from '../../lib/stripe'


export const Products: CollectionConfig = {
    slug: 'products',
    labels: { singular: 'Producto', plural: 'Productos' },

    admin: {
        useAsTitle: 'name',
        hidden: ({ user }) => user.role !== 'admin',
        description: 'Lista de todos los Productos registrados, en publicación o no.',
        hideAPIURL: true,
    },

    access: {
        create: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
    },

    hooks: {

        beforeChange: [
            // addUser,

            async (args) => {

                if (args.operation === 'create') {
                    const data = args.data as Product

                    const createdProduct =
                        await stripe.products.create({
                            name: data.name,
                            default_price_data: {
                                currency: 'COP',
                                unit_amount: Math.round(data.price * 100),
                            },
                        })

                    const created: Product = {
                        ...data,
                        user: args.req.user.id,
                        stripeId: createdProduct.id,
                        priceId: createdProduct.default_price as string,
                    }

                    return created
                }

                else if (args.operation === 'update') {
                    const data = args.data as Product

                    const updatedProduct =
                        await stripe.products.update( data.stripeId!, {
                            name: data.name,
                            default_price: data.priceId!,
                        })

                    const updated: Product = {
                        ...data,
                        stripeId: updatedProduct.id,
                        priceId: updatedProduct.default_price as string,
                    }

                    return updated
                }

            },

        ],

    },

    fields: [
        {
            name: 'user',
            type: 'relationship',
            required: true,
            relationTo: 'users',
            hasMany: false,
            access : {
                update: () => false,
                read: () => true,
                create: () => false,
            },
            admin: { hidden : true, },
        },

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
        },

        {
            name: 'price',
            label: 'Valor',
            type: 'number',
            required: true,
            validate: (value) => {
                if (value < 0) {
                    return 'El valor no puede ser negativo.'
                }
                if (!Number.isInteger(value)) {
                    return 'El valor debe ser un número entero.'
                }
                return true
            },
        },

        {
            name: 'qty',
            label: 'Cantidad',
            type: 'number',
            required: true,
            validate: (value) => {
                if (value < 0) {
                    return 'La cantidad no puede ser negativa.'
                }
                if (!Number.isInteger(value)) {
                    return 'El valor debe ser un número entero.'
                }
                return true
            },
        },

        {
            name: 'category',
            label: 'Categorias',
            type: 'relationship',
            relationTo: 'category',
            hasMany: true,
            required: true,
        },

        {
            name : 'compras',
            label: 'Compras',
            type : 'number',
            defaultValue : 0,
            required : false,
            access : {
              create: () => false,
              update: () => true,
              read: ({req}) => req.user.role === 'admin',
            },
            admin : {
            //   readOnly : true,
              description : 'Total de Compras realizadas a este Producto.',
            },
            validate: (value) => {
                if (value < 0) {
                    return 'El valor no puede ser negativo.'
                }
                return true
            },
        },

        {
            name: 'product_files',
            label: 'Archivo',
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: false,
            required: true,
        },

        {
            name: 'approvedForSale',
            label: 'Estado',
            type: 'select',
            defaultValue: 'pending',
            options: [
                { value: 'pending', label: 'En Revision' },
                { value: 'approved', label: 'Aprovado' },
                { value: 'denied', label: 'Rechazado' }],

            access: {
                create: ({ req }) => req.user.role === 'admin',
                read: ({ req }) => req.user.role === 'admin',
                update: ({ req }) => req.user.role === 'admin',
            },
        },

        {
            name: 'priceId',
            type: 'text',
            admin: { hidden: true, },

            access: {
                create: () => false,
                read: () => true,
                update: () => false,
            },
        },

        {
            name: 'stripeId',
            type: 'text',
            admin: { hidden: true, },

            access: {
                create: () => false,
                read: () => true,
                update: () => false,
            },
        },

        {
            name: 'images',
            type: 'array',
            label: 'Imagen',
            minRows: 1,
            maxRows: 5,
            required: true,
            labels: {
                singular: 'Imagen', plural: 'Imagenes',
            },
            fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true, }
            ],
        },
    ]
}
