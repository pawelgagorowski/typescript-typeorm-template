import Collection from '@server/collection';
import logger from '@config/logger/instance';
import { ApiPath } from '@server/types';
import { CreateOrderRequestZodSchema, CreateProductRequestZodSchema, GetProductIdRequestZodSchema } from '@shop/schema';
import CreateOrderController from './controllers/orderCreate';
import CreateProductController from './controllers/productCreate';
import GetProductsController from './controllers/productsGet';
import GetProductController from './controllers/productGet';
import GetOrdersController from './controllers/ordersGet';

export default new Collection(logger, 'shop', [
  new CreateOrderController(
    { logger },
    { path: ApiPath.V1_ORDER_CREATE, method: 'post', feature: 'user' },
    {
      bodyValidation: CreateOrderRequestZodSchema,
      paramsValidation: null
    }
  ),
  new GetOrdersController({ logger }, { path: ApiPath.V1_ORDERS_GET, method: 'get', feature: 'product' }),
  new CreateProductController(
    { logger },
    { path: ApiPath.V1_PRODUCT_CREATE, method: 'post', feature: 'product' },
    { bodyValidation: CreateProductRequestZodSchema, paramsValidation: null }
  ),
  new GetProductsController({ logger }, { path: ApiPath.V1_PRODUCTS_GET, method: 'get', feature: 'product' }),
  new GetProductController(
    { logger },
    { path: ApiPath.V1_PRODUCT_GET, method: 'get', feature: 'product' },
    {
      paramsValidation: GetProductIdRequestZodSchema,
      bodyValidation: null
    }
  )
]);
