import { z } from 'zod';
import type { EntrySchema, LuckDrawSchema } from '../model/schema';

export type LuckDraw = z.infer<typeof LuckDrawSchema>;
export type Entry = z.infer<typeof EntrySchema>;
