import { Length } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { sharedConstrains } from '../../../shared';

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
}
