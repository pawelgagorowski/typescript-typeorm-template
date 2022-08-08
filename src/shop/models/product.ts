/* eslint-disable import/no-cycle */
import { User } from '@user/models/user';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import Order from './order';

@Entity({ name: 'product' })
export default class Product {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column('varchar')
  description: string | undefined = undefined;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[] | undefined = undefined;

  @ManyToOne(() => User, (user) => user.products)
  user!: User;

  @Column({ type: 'timestamptz', default: 'now()' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamptz' })
  updatedAt: Date = new Date();
}
