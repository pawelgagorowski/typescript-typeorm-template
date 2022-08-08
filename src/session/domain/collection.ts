import Collection from '@server/collection';
import logger from '@config/logger/instance';
import { ApiPath } from '@server/types';
import SignInController from './controllers/signIn';
import RefreshTokenController from './controllers/refreshToken';
import { SignInZodSchema } from '../schema';

export default new Collection(logger, 'autorization', [
  new SignInController(
    { logger },
    { path: ApiPath.V1_AUTH_SIGN_IN, method: 'post', feature: 'autorization' },
    { bodyValidation: SignInZodSchema, paramsValidation: null }
  ),
  new RefreshTokenController(
    { logger },
    { path: ApiPath.V1_AUTH_REFRESH_TOKEN, method: 'get', feature: 'autorization' }
  )
]);
