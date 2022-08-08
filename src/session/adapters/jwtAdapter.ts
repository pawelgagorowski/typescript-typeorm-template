import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import dataSource from '@database/connection';
import { JwtUserDecoded } from '@server/types';
import config from 'config';
import { SessionAdapter } from '../types';
import { User } from '@/user/models/user';

const JWTSessionAdapter = (userRepository: Repository<User>): SessionAdapter => ({
  createAccessToken({ userId }: JwtUserDecoded): string {
    return jwt.sign({ userId }, config.get('accessTokenSecret'), {
      expiresIn: 600000
    });
  },

  createRefreshToken({ userId }: JwtUserDecoded): string {
    return jwt.sign({ userId }, config.get('accessTokenSecret'), {
      expiresIn: 10000
    });
  },

  decodeToken(token: string): JwtUserDecoded | null {
    const decodedToken = jwt.decode(token) as JwtUserDecoded | null;
    if (!decodedToken?.userId) return null;
    return decodedToken;
  },

  checkPassword(password: string, hashedPassword: string): boolean {
    const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
    return isPasswordValid;
  },

  isTokenValid(token: string) {
    try {
      jwt.verify(token, config.get('accessTokenSecret'));
      return true;
    } catch (error) {
      return false;
    }
  },

  async addRefreshToken(refreshToken: string): Promise<{} | null> {
    try {
      console.log('refreshToken', refreshToken);
      const hello = await userRepository.update(
        { id: 1 },
        { refreshTokens: () => `array_append("refreshTokens", 'fsdfsfs')` }
      );
      return hello;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }
});

export default JWTSessionAdapter(dataSource.getRepository(User));

// const hello = await userRepository
//   .createQueryBuilder()
//   .update(User)
//   .set({
//     refreshTokens: () => `array_append("refreshTokens", 'hello')`
//   })
//   .where('id = :id', { id: 1 })
//   .execute();
