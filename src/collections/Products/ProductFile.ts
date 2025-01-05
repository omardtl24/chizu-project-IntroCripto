import { User } from '../../payload-types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Access, CollectionConfig } from 'payload/types'

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null
  return { ...data, user: user?.id }
}

const adquiridos: Access = async ({ req }) => {
  const user = req.user as User | null

  if (user?.role === 'admin'){ return true }
  if (!user){ return false }

  const { docs: products } = await req.payload.find({
    collection: 'products', // añadir a payload.config y correr yarn generate:types
    depth: 0,
    where: {
      user: { equals: user.id, },
    },
  })

  const ownProductFileIds = products.map((prod) => prod.product_files).flat()

  const { docs: orders } = await req.payload.find({
    collection: 'orders',
    depth: 2, // join no solo el user id, sino el objeto user completo con sus relaciones a productos adquiridos tambien.
    where: {
      user: { equals: user.id, },
    },
  })

  const purchasedProductFileIds = orders.map((order) => {

      return order.products.map((product) => {
        if (typeof product === 'string'){
          return req.payload.logger.error( 'No se ha encontrado la ID (verificar la profundidad de busqueda depth )' )
        }

        return typeof product.product_files === 'string' ? product.product_files : product.product_files.id
      })
    })
    .filter(Boolean).flat()


  return {
    id: {
      in: [ ...ownProductFileIds, ...purchasedProductFileIds, ],
    },
  }

}

export const ProductFiles: CollectionConfig = {
  slug: 'product_files',
  labels: {singular: 'Archivo', plural: 'Archivos'},

  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    hideAPIURL: true,
    description: 'Adelantos de los Mangas para ser descargados por los Usuarios, una vez han adquirido un Manga.',
  },

  hooks: {
    beforeChange: [addUser],
  },

  access: {
    read: adquiridos,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  
  upload: {
    staticURL: '/product_files',
    staticDir: 'product_files',
    mimeTypes: [ 'image/*', 'application/pdf' ],
  },

  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: { condition: () => false, },
      hasMany: false,
      required: true,
    },

  ],
}
