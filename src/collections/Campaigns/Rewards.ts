import { Tier, User } from '../../payload-types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Access, CollectionConfig } from 'payload/types'

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null
  return { ...data, user: user?.id }
}
const adminAndUser = (): Access => async ({ req }) => {
  const user = req.user as User | undefined

  if (!user){ return false }
  if (user.role === 'admin'){ return true }

  return {
    user: { equals: req.user.id, },
  }
}

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null

  if (user?.role === 'admin') return true
  if (!user) return false

  const { docs: tiers } = await req.payload.find({
    collection: 'tiers',
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  })

  const ownRewards = tiers
    .map((tier) => tier.rewards)
    .flat()

  const { docs: orders } = await req.payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
      type: { equals: 'reward' }
    },
  })

  const purchasedRewards = orders
    .map((order) => {
      const tier = order.tiers as Tier
      return (tier.rewards ?? []).map((reward) => {

        return typeof reward === 'string'
          ? reward
          : reward.id

      })
    })
    .filter(Boolean)
    .flat()

  return {
    id: {
      in: [
        ...ownRewards,
        ...purchasedRewards,
      ],
    },
  }
}

export const Rewards: CollectionConfig = {
  slug: 'rewards',
  labels: {singular: 'Recompensa', plural: 'Recompensas'},

  admin: {
    // hidden: ({ user }) => user.role !== 'admin',
    hideAPIURL: true,
    description: 'Recompensas adquiridas o subidas.',
    useAsTitle: 'id',
  },

  hooks: {
    beforeChange: [addUser],
  },

  access: {
    read: async ({req}) => {
      const refer = req.headers.referer

      if ( !req.user || !refer?.includes('panel') ){ return true }
      return await adminAndUser()({req})
    },
    update: adminAndUser(),
    delete: ({ req }) => req.user.role === 'admin',
},
  
  upload: {
    staticURL: '/product_files',
    staticDir: 'product_files',
    mimeTypes: [ 'image/*', 'application/pdf', 'application/x-zip-compressed'],
  },

  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: { 
        condition: ({ id }) => !!id,
        readOnly: true,
      },
      hasMany: false,
      required: true,
    },

  ],
}
