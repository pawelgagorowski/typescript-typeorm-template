import { Repository } from 'typeorm';
import dataSource from '@database/connection';
import { ILogger } from '@config/logger/types';
import loggerInstance from '@config/logger/instance';
import Product from '@shop/models/product';
import { CreateProductRequest, ShopPersistanceAdapter } from '../types';
import { User } from '@/user/models/user';
import Order from '../models/order';

const shopPostgresAdapter = (
  repository: {
    userRepository: Repository<User>;
    orderRepository: Repository<Order>;
    productRepository: Repository<Product>;
  },
  logger: ILogger
): ShopPersistanceAdapter => ({
  async makeOrder({ userId, productIds }: { userId: number; productIds: number[] }): Promise<string> {
    try {
      const user = await repository.userRepository.findOne({
        where: { id: userId }
      });
      if (!user) return 'no user found';

      const products = productIds.map(async (productId) =>
        repository.productRepository.findOne({
          where: { id: productId }
        })
      );
      const resolvedProducts = await Promise.all(products);
      const areProductAvailable = resolvedProducts.every((resolvedProduct) => resolvedProduct !== null);

      if (!areProductAvailable) return 'some of the products are not vailable currently';
      const order = repository.orderRepository.create({
        user
      });

      order.products = resolvedProducts as Product[];
      await repository.orderRepository.save(order);

      return 'order was successfully created';
    } catch (error) {
      logger.errorObject(error, 'makeOrder');
      return 'there was a problem while making order';
    }
  },

  async fetchOrders<T>(userId: number): Promise<T[] | null> {
    try {
      const orders = await repository.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.products', 'products')
        .where('order.userId = :id', { id: userId })
        .select(['order.id', 'products.description', 'products.id'])
        .getMany();

      console.log('orders', orders);
      return orders as unknown as T[];
    } catch (error) {
      logger.errorObject(error, 'fetchProducts');
      return null;
    }
  },

  async addProduct(userId: number, createProductRequest: CreateProductRequest): Promise<string> {
    try {
      const user = await repository.userRepository.findOne({
        where: { id: userId }
      });

      if (!user) return 'user not found';
      const product = repository.productRepository.create({
        ...createProductRequest,
        user
      });
      await repository.productRepository.save(product);
      return 'product was succesfully created';
    } catch (error) {
      logger.errorObject(error, 'createUser');
      return 'there was a problem with produkt creating';
    }
  },

  async fetchProducts<T>(userId: number): Promise<T[] | null> {
    try {
      const products = await repository.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.user', 'user')
        .leftJoinAndSelect('product.orders', 'orders')
        .where('product.userId = :userId', { userId })
        .select(['product.description', 'product.id', 'orders.id'])
        .getMany();

      console.log('fetched products', products);

      return products as unknown as T[];
    } catch (error) {
      logger.errorObject(error, 'fetchProducts');
      return null;
    }
  },

  async fetchProduct(productId: number): Promise<Partial<Product> | null> {
    try {
      const product = await repository.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.orders', 'orders')
        .leftJoinAndSelect('product.user', 'user')
        .where('product.id = :productId', { productId })
        .select(['orders.id', 'user.email', 'product.description'])
        .getOne();

      console.log('fetched product', product);
      if (!product) return null;
      return product;
    } catch (error) {
      logger.errorObject(error, 'fetchProducts');
      return null;
    }
  }
});

export default shopPostgresAdapter(
  {
    userRepository: dataSource.getRepository(User),
    orderRepository: dataSource.getRepository(Order),
    productRepository: dataSource.getRepository(Product)
  },
  loggerInstance
);
