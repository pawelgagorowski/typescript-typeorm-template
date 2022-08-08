import { JwtUserDecoded } from '@server/types';
import { SessionAdapter } from '../../types';

export const createAccessToken = (sessionAdapter: SessionAdapter, userDataForDecoding: JwtUserDecoded) =>
  sessionAdapter.createAccessToken(userDataForDecoding);
export const checkPassword = (sessionAdapter: SessionAdapter, password: string, hashedPassword: string) =>
  sessionAdapter.checkPassword(password, hashedPassword);
export const createRefreshToken = (sessionAdapter: SessionAdapter, userDataForDecoding: JwtUserDecoded) =>
  sessionAdapter.createRefreshToken(userDataForDecoding);
export const addRefreshToken = async (sessionAdapter: SessionAdapter, refreshToken: string) =>
  sessionAdapter.addRefreshToken(refreshToken);
export const isTokenValid = (sessionAdapter: SessionAdapter, token: string) => sessionAdapter.isTokenValid(token);
export const decodeToken = (sessionAdapter: SessionAdapter, token: string) => sessionAdapter.decodeToken(token);
