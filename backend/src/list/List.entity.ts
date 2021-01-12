import { Length } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { sharedConstrains } from '../../../shared';
import { Product } from '../product';
import { User } from '../user/User.entity';

const { listTitle } = sharedConstrains;

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Length(listTitle.min, listTitle.max)
  @Column()
  title!: string;

  @ManyToOne(() => User, (user) => user.lists)
  user!: User;

  @ManyToMany(() => Product, { cascade: true, eager: true })
  @JoinTable()
  products?: Product[];
}
