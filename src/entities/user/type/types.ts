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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  username: string;
  nickname: string;
  cardRegistered: boolean;
  balance: number | null;
  identityVerifeid: boolean;
  accessToken: string;
}
