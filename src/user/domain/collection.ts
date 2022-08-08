import Collection from '@server/collection';
import logger from '@config/logger/instance';
import { ApiPath } from '@server/types';
import CreateUserController from './controllers/createUser';
import GetMyProfileController from './controllers/getUser';
import { UserRegisterZodSchema } from '../schema';

export default new Collection(logger, 'user', [
  new CreateUserController(
    { logger },
    { path: ApiPath.V1_USER_CREATE, method: 'post', feature: 'user' },
    { bodyValidation: UserRegisterZodSchema, paramsValidation: null }
  ),
  new GetMyProfileController({ logger }, { path: ApiPath.V1_USER_GET, method: 'get', feature: 'user' })
]);
