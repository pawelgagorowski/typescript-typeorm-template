import 'reflect-metadata';
import 'module-alias/register';
import config from 'config';
import HttpServer from '@server/httpServer';
import logger from '@config/logger/instance';
import MiddlewareOptionsBuilder from '@server/middleware';
import AppDataSource from '@database/connection';
import shopCollection from '@shop/domain/collection';
// import { User } from '@user/models/user';
// import Product from '@shop/models/product';
// import Order from '@shop/models/order';
import systemCollection from '@/system/collection';
import userCollection from '@/user/domain/collection';
import sessionCollection from '@/session/domain/collection';

// async function seed() {
//   const userRepo = AppDataSource.getRepository(User);
//   const user = userRepo.create({
//     password: '$2a$08$Zxk9Kxr4kfOauhWA4ytt2eHMECUcUSsVizv/OwGvRwPEC0ASNbTfK', // password: 123456789
//     email: 'test@wp.pl',
//     language: 'pl',
//     firstName: 'Paweł'
//   });
//   await userRepo.save(user);

//   const productRepo = AppDataSource.getRepository(Product);
//   const product = productRepo.create({
//     user,
//     description: 'Honda Civic number 1'
//   });
//   await productRepo.save(product);

//   const orderRepo = AppDataSource.getRepository(Order);
//   const order = orderRepo.create({
//     user,
//     products: [product]
//   });
//   await orderRepo.save(order);
//   console.log('seed created');
// }

(async () => {
  try {
    await AppDataSource.initialize();
    const middlewareOptions = new MiddlewareOptionsBuilder(logger);
    middlewareOptions.useHelmet();
    middlewareOptions.useBodyParser();
    middlewareOptions.useSwagger({ apis: ['./src/**/*.ts'] });
    middlewareOptions.usePrometheusMetrics();

    const server = new HttpServer(middlewareOptions, logger, config);
    server.initializeControllers([systemCollection, userCollection, sessionCollection, shopCollection]);
    server.start();
    // console.log('AppDataSource', await AppDataSource.initialize());
  } catch (error) {
    logger.errorObject(error);
  }
})();
