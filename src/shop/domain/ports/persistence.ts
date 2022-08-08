import { CreateProductRequest, ShopPersistanceAdapter } from '../../types';

export const makeOrder = async (
  shopPersistanceAdapter: ShopPersistanceAdapter,
  { userId, productIds }: { userId: number; productIds: number[] }
) => shopPersistanceAdapter.makeOrder({ userId, productIds });
export const addProduct = async (
  shopPersistanceAdapter: ShopPersistanceAdapter,
  userId: number,
  product: CreateProductRequest
) => shopPersistanceAdapter.addProduct(userId, product);
export const fetchProducts = async <T>(shopPersistanceAdapter: ShopPersistanceAdapter, userId: number) =>
  shopPersistanceAdapter.fetchProducts<T>(userId);
export const fetchProduct = async (shopPersistanceAdapter: ShopPersistanceAdapter, productId: number) =>
  shopPersistanceAdapter.fetchProduct(productId);
export const fetchOrders = async <T>(shopPersistanceAdapter: ShopPersistanceAdapter, userId: number) =>
  shopPersistanceAdapter.fetchOrders<T>(userId);
