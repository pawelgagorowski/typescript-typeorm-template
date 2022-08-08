import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import isFeatureUsed from '@config/utils';
import { decodeToken, isTokenValid } from '@/session/domain/ports/session';
import jwtAdapter from '@/session/adapters/jwtAdapter';
import { getUserById } from '@/user/domain/ports/persistence';
import postgresqlAdapter from '@/user/adapters/postgresqlAdapter';
import { User } from '@/user/models/user';
import { TokenType } from './types';

type RequestValidatingTarget = 'body' | 'params';

export default class BasicControllerMiddlewares {
  validate =
    (validatingObject: z.ZodEffects<z.AnyZodObject>, requestValidatingTarget: RequestValidatingTarget) =>
    (req: Request<any>, res: Response<any>, next: NextFunction) => {
      const result = validatingObject.safeParse(req[requestValidatingTarget]);
      if (!result.success) {
        const validationErrors = result.error.errors.reduce((acc, el) => {
          acc.push(`${el.path[0]} ${el.message}`);
          return acc;
        }, [] as string[]);
        return res.json({ validationErrors });
      }
      return next();
    };

  authorizeToken = (tokenType: TokenType) => async (req: Request, res: Response, next: NextFunction) => {
    if (!isFeatureUsed('autorization')) return next();
    const missingMessage = tokenType === 'authorization' ? 'authorization token' : 'refresh token';

    if (!req.headers[tokenType]) return res.json({ message: `${missingMessage} is missing` });
    const validToken = isTokenValid(jwtAdapter, req.headers[tokenType] as string);

    if (!validToken) return res.json({ message: `${missingMessage} is invalid` });
    console.log('token is invalid');
    const decodedUser = decodeToken(jwtAdapter, req.headers[tokenType] as string);

    if (!decodedUser) return res.json({ message: 'no userId in token' });
    console.log('no userId in token');
    console.log('decodedUser.userId', decodedUser.userId);
    const user = await getUserById<User>(postgresqlAdapter, decodedUser.userId);
    console.log('user', user);

    if (!user) {
      console.log('no such user in database');
      return res.json({ message: 'no such user in database' });
    }
    req.user = decodedUser;
    console.log('przed next');
    return next();
  };
}
