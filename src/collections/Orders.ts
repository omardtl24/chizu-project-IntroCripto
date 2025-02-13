import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
    if (user.role === 'admin'){ return true }
  
    return {
      user: { equals: user?.id, },
    }
}

export const Orders : CollectionConfig = {
    slug: 'orders',
    labels: { singular: 'Orden', plural: 'Ordenes' },
    admin: {
      useAsTitle: 'id',
      description: 'Registro de todas las ordenes realizadas hasta el momento. Los ejecutables adquiridos estan disponibles en la Sección de Archivos.',
      hideAPIURL: true,
    },

    access: {
        read: yourOwn,
        update: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
        create: () => false,
    },

    fields: [
        {
          name: 'paymentId',
          type: 'number',
          required : false,
          access: {
            create: () => false,
            read: () => true,
            update: ({req}) => req.user.role === 'admin',
          },
        },                
        {
          name: 'preferenceId',
          type: 'text',
          required : false,
          access: {
            create: () => false,
            read: () => true,
            update: ({req}) => req.user.role === 'admin',
          },
        },        
        {
          name: 'total',
          label: 'Total',
          type: 'number',
          required : true,
          access: {
            create: () => false,
            read: () => true,
            update: ({req}) => req.user.role === 'admin',
          },
        },

        {
          name: '_isPaid',
          type: 'checkbox',
          access: {
            read: () => true,
            create: () => false,
            update: ({ req }) => req.user.role === 'admin',
          },
          // admin: { hidden: true, },
          required: true,
        },

        {
          name: 'user',
          type: 'relationship',
          access: {
            read: ({req}) => req.user.role === 'admin',
            create: () => false,
            update: () => false,
          },
          admin: { readOnly: true,},
          relationTo: 'users',
          required: true,
        },

        {
          name: 'products',
          type: 'relationship',
          relationTo: 'products',
          required: false,
          hasMany: true,
          access : {
            read: ({req}) => req.user.role === 'admin',
            create: () => false,
            update: ({req}) => req.user.role === 'admin',
          },
        },
        {
          name: 'tiers',
          type: 'relationship',
          relationTo: 'tiers',
          required: false,
          hasMany: false,
          access : {
            read: ({req}) => req.user.role === 'admin',
            create: () => false,
            update: ({req}) => req.user.role === 'admin',
          }
        }
    ],

}
