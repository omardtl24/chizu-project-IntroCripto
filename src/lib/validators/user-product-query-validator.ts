import { z } from 'zod'

export const userProductQueryValidator = z.object({
  userID: z.number().optional(),
  sort: z.enum(['asc', 'desc', 'price', '-price']).optional(),
  limit: z.number().optional(),
  searchTerm: z.string().optional(), 
})

export type TypeUserProductQueryValidator = z.infer<typeof userProductQueryValidator>
