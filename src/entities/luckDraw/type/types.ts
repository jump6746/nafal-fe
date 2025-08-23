import { z } from 'zod';
import type { EntrySchema, LuckDrawSchema } from '../model/schema';

export type LuckDraw = z.infer<typeof LuckDrawSchema>;
export type Entry = z.infer<typeof EntrySchema>;

export interface LuckDrawList {
  productImgPresignedUrl: string;
  productName: string;
  amount: number;
  progress: number;
  limit: number;
}
