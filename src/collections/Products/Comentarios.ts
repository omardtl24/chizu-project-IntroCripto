import { User } from '../../payload-types'
import { Access, CollectionConfig } from "payload/types";
import { BeforeChangeHook } from 'payload/dist/collections/config/types'

const adminAndUser: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    id: { equals: user.id, },
  }
}

const onlyUser: Access = ({ req: { user } }) => {
  return {
    id: { equals: user.id, },
  }
}

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null
  return { ...data, user: user?.id }
}

export const Comentarios: CollectionConfig = {
    slug: 'comentarios',
    labels: {singular: 'Comentario', plural: 'Comentarios'},

    admin: { 
        useAsTitle: 'id' ,
        // hidden : ({user}) => user.role !== 'admin',
        description: 'Comentarios de los jugadores.',
        hideAPIURL: true,
    },

    access : {
        create: () => false,
        delete: adminAndUser,
        update: onlyUser,
        read: adminAndUser,
    },

    hooks: {
        // beforeChange: [addUser],
    },

    fields: [

        {
            name: 'comentario',
            label: 'Comentario',
            type: 'textarea',
            required: false,
        },

        {
            name: 'rating',
            label: 'Calificación',
            type: 'select',
            required: true,
            options: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
            ],
        },

        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            hasMany: false,
            required: true,
            access : {
                update: () => false,
                // read: ({req}) => req.user.role === 'admin',
                create: () => false,
            },
            admin: { condition: () => false, },
        },

        {
            name: 'product',
            label: 'Producto',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            hasMany: false,
            access : {
                update: () => false,
                // read: ({req}) => req.user.role === 'admin',
                create: () => false,
            },
            admin: { condition: () => false, },  
        },

    ]
}
