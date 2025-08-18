import { z } from 'zod';

export const LuckDrawSchema = z.object({
  draw_id: z.number().int().positive(),
  auction_id: z.number().int().positive(),
  product_name: z.string().max(255), // varchar 255
  amount: z.number().int().positive(), // small int
  ticket_limits: z.number().int().positive(),
  order: z.number().int().positive(), // small int
  created_at: z.date(),
});

export const EntrySchema = z.object({
  entry_id: z.number().int().positive(),
  draw_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  is_winner: z.number().int().positive(), // tiny int
  created_at: z.date(),
});
