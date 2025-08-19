import { z } from 'zod';

export const LuckDrawSchema = z.object({
  drawId: z.number().int().positive(),
  auctionId: z.number().int().positive(),
  productName: z.string().max(255), // varchar 255
  amount: z.number().int().positive(), // small int
  ticketLimits: z.number().int().positive(),
  order: z.number().int().positive(), // small int
  createdAt: z.date(),
});

export const EntrySchema = z.object({
  entryId: z.number().int().positive(),
  drawId: z.number().int().positive(),
  userId: z.number().int().positive(),
  isWinner: z.number().int().positive(), // tiny int
  createdAt: z.date(),
});
