import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.number().int().positive(),
  username: z.string().max(255),
  password: z.string().max(255),
  role: z.enum(['ADMIN', 'SELLER', 'COMMON']),
});
