import { z } from 'zod'
export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 chars'),
  body: z.string().min(10, 'Body must be at least 10 chars'),
  userId: z.coerce.number().int().positive('User is required'),
})
export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3),
})
