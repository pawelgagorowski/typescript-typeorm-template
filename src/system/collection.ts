import Collection from '@server/collection';
import logger from '@config/logger/instance';
import { ApiPath } from '@server/types';
import HealtController from './health';
import ConfigController from './config';

export default new Collection(logger, 'system', [
  new HealtController({ logger }, { path: ApiPath.HEALTH_CHECK, method: 'get', feature: 'health' }),
  new ConfigController({ logger }, { path: ApiPath.CONFIG, method: 'get', feature: 'config' })
]);
