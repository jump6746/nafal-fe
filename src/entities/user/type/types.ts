import { z } from 'zod';
import type { UserSchema } from '../model';

export type User = z.infer<typeof UserSchema>;

export interface SignupRequest {
  username: string;
  password: string;
  role: 'COMMON' | 'SELLER' | 'ADMIN';
}

export interface SignupResponse {
  userId: number;
  username: string;
  nickname: string;
  role: 'COMMON' | 'SELLER' | 'ADMIN';
}
