import { z } from 'zod';
import { Product } from './models/database';
import { CreateOrderRequestZodSchema, CreateProductRequestZodSchema, GetProductIdRequestZodSchema } from './schema';

export type ShopPersistanceAdapter = {
  makeOrder({ userId, productIds }: { userId: number; productIds: number[] }): Promise<string>;
  addProduct(userId: number, productCreate: CreateProductRequest): Promise<string>;
  fetchProduct(productId: number): Promise<Partial<Product> | null>;
  fetchProducts<T>(userId: number): Promise<T[] | null>;
  fetchOrders<T>(userId: number): Promise<T[] | null>;
};

export type CreateProductRequest = z.infer<typeof CreateProductRequestZodSchema>;
export type GetProductIdRequest = z.infer<typeof GetProductIdRequestZodSchema>;
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestZodSchema>;
