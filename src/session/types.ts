import { JwtUserDecoded } from '@server/types';
import { z } from 'zod';
import { RefreshTokenZodSchema, SignInZodSchema } from './schema';

export type SessionAdapter = {
  createAccessToken(userDataForDecoding: JwtUserDecoded): string;
  createRefreshToken(userDataForDecoding: JwtUserDecoded): string;
  checkPassword(password: string, hashedPassword: string): boolean;
  addRefreshToken(refreshToken: string): Promise<{} | null>;
  isTokenValid(token: string): boolean;
  decodeToken(token: string): JwtUserDecoded | null;
  // isRefreshToken(refreshToken: string, refreshTokens: string[]): boolean;
};

export type RefreshToken = z.infer<typeof RefreshTokenZodSchema>;
export type UserValidation = z.infer<typeof SignInZodSchema>;
