import { z } from 'zod';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import Order from '@shop/models/order';
import Product from '@shop/models/product';
import { LanguageEnum } from '../schema';

export type Status = 'active' | 'inactive';
export type Language = z.infer<typeof LanguageEnum>;

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index({ unique: true })
  @Column('varchar', { length: 500 })
  email: string = '';

  @Column('varchar', { length: 500, nullable: true })
  firstName: string = '';

  @Column('varchar', { length: 1000 })
  password!: string;

  @Column('varchar', { length: 1000, nullable: true })
  language: Language | null = null;

  @Column('varchar')
  status: Status = 'inactive';

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true
  })
  orders: Order[] | undefined = undefined;

  @OneToMany(() => Product, (product) => product.user, {
    cascade: true
  })
  products: Product[] | undefined = undefined;

  @Column('varchar', { nullable: true, array: true })
  refreshTokens: string[] = [];

  @Column({ type: 'timestamptz', default: 'now()' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamptz' })
  updatedAt: Date = new Date();
}
