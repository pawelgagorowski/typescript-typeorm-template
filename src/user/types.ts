import { z } from 'zod';
import { UserRegisterZodSchema } from './schema';

export type UserPersistanceAdapter = {
  createUser(user: UserRegister): Promise<string>;
  getUserById<T>(id: number): Promise<T | null>;
  getUserByEmail<T>(email: string): Promise<T | null>;
};

export type UserRegister = z.infer<typeof UserRegisterZodSchema>;
