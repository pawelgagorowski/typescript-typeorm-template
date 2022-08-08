import { DataSource } from 'typeorm';
import Entities from '@/entities';

console.log('Entities', Entities);

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Entities.User, Entities.Order, Entities.Product],
  synchronize: true,
  logging: true
});

export default AppDataSource;
