import * as express from 'express';
import ApiPath from '../config/api';
import COLLECTION from '../config/collections';
import { FeatureName } from '../config/features';

export interface IController {
  router: express.Router;
  method: HttpMethods;
  feature: FeatureName | FeatureName[];
  path: ApiPath;
  initRoutes(): void;
}

export interface ICollection {
  collectionName: COLLECTION;
  addControllers(app: express.Application): void;
}

export interface Config {
  get<T>(setting: string): T;
}

export type HttpMethods = 'get' | 'post' | 'put';
