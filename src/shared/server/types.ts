import express from 'express';
import { z } from 'zod';
import { ILogger } from '@config/logger/types';
import { FeatureName } from '@config/features';

export type CollectionName = 'system' | 'geoloation' | 'user' | 'autorization' | 'shop';

export enum ApiPath {
  HEALTH_CHECK = '/api/healthcheck',
  CONFIG = '/api/config',
  V1_AUTH_SIGN_IN = '/api/v1/auth/signin',
  V1_AUTH_REFRESH_TOKEN = '/api/v1/auth/refreshToken',
  V1_USER_CREATE = '/api/v1/register',
  V1_USER_GET = '/api/v1/me',
  V1_ORDER_CREATE = '/api/v1/order',
  V1_ORDERS_GET = '/api/v1/orders',
  V1_PRODUCT_CREATE = '/api/v1/product',
  V1_PRODUCTS_GET = '/api/v1/products',
  V1_PRODUCT_GET = '/api/v1/product/:productId'
}

export type BasicDependencies = {
  logger: ILogger;
};

export type ControllerConfig = {
  method: HttpMethod;
  path: ApiPath;
  feature: FeatureName | FeatureName[];
};

export type ControllerMiddlewares = {
  bodyValidation: ZodValidatingObject | null;
  paramsValidation: ZodValidatingObject | null;
};

export interface IController {
  router: express.Router;
  logger: ILogger;
  method: HttpMethod;
  feature: FeatureName | FeatureName[];
  path: ApiPath;
  initRoutes(): void;
}
export interface ICollection {
  collectionName: CollectionName;
  addControllers(app: express.Application): void;
}

export interface Config {
  get<T>(setting: string): T;
}

export type SwaggerConfig = {
  definition?: {
    openapi: string;
    info: {
      title: string;
      version: string;
    };
  };
  apis?: string[];
};

export type ZodValidatingObject = z.ZodEffects<z.AnyZodObject>;

export type HttpMethod = 'get' | 'post' | 'put';

export type JwtUserDecoded = {
  userId: number;
};

export type TokenType = 'authorization' | 'refresh-token';
