import { z } from 'zod';
import type { UserSchema } from '../model';

export type User = z.infer<typeof UserSchema>;
