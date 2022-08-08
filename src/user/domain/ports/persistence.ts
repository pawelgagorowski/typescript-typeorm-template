import { UserPersistanceAdapter, UserRegister } from '@/user/types';

export const createUser = async (persistanceAdapter: UserPersistanceAdapter, user: UserRegister) =>
  persistanceAdapter.createUser(user);
export const getUserById = async <T>(persistanceAdapter: UserPersistanceAdapter, id: number) =>
  persistanceAdapter.getUserById<T>(id);
export const getUserByEmail = async <T>(persistanceAdapter: UserPersistanceAdapter, email: string) =>
  persistanceAdapter.getUserByEmail<T>(email);
