import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import dataSource from '@database/connection';
import { ILogger } from '@config/logger/types';
import loggerInstance from '@config/logger/instance';
import { User } from '@/user/models/user';
import { UserPersistanceAdapter, UserRegister } from '../types';

console.log('User from postgress', User);

const userPostgresAdapter = (
  repository: {
    userRepository: Repository<User>;
  },
  logger: ILogger
): UserPersistanceAdapter => ({
  async createUser({ email, password, firstName, language }: UserRegister): Promise<string> {
    try {
      const user = repository.userRepository.create({
        email,
        password: bcrypt.hashSync(password, 8),
        firstName,
        language
      });
      await repository.userRepository.save(user);
      return 'user was succesfully created';
    } catch (error) {
      logger.errorObject(error, 'createUser');
      return 'there was a problem with user creating';
    }
  },

  async getUserById<T>(userId: number): Promise<T | null> {
    try {
      const user = await repository.userRepository.findOne({
        where: { id: userId }
      });

      if (!user) return null;
      return user as unknown as T;
    } catch (error) {
      logger.errorObject(error, 'getUserById');
      return null;
    }
  },

  async getUserByEmail<T>(email: string): Promise<T | null> {
    try {
      const user = await repository.userRepository.findOne({ where: { email } });
      if (!user) return null;
      return user as unknown as T;
    } catch (error) {
      logger.errorObject(error, 'getUserByEmail');
      return null;
    }
  }
});

export default userPostgresAdapter({ userRepository: dataSource.getRepository(User) }, loggerInstance);
