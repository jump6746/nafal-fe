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
  accessToken: string;
}

export interface GetUserResponse {
  id: number;
  username: string;
  nickname: string;
  role: 'COMMON' | 'SELLER' | 'ADMIN';
  shortLogoKey: string;
  longLogoKey: string;
  identityVerified: boolean;
  cardRegistered: boolean;
  balance: number;
}
