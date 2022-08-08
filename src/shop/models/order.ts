/* eslint-disable import/no-cycle */
import { User } from '@user/models/user';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import Product from './product';

@Entity({ name: 'order' })
export default class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @ManyToMany(() => Product, (product) => product.orders, {
    cascade: true
  })
  @JoinTable()
  products: Product[] | undefined = undefined;

  @Column({ type: 'timestamptz', default: 'now()' })
  createdAt: Date = new Date();
}
