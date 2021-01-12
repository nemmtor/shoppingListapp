import { Length } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { sharedConstrains } from '../../../shared';
import { List } from '../list/List.entity';

const { username } = sharedConstrains;

@Entity('app_user') // because user table is defined in postgres
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Length(username.min, username.max)
  @Column({ unique: true })
  username!: string;

  // Dont validate password because it is a hash here
  @Column()
  password!: string;

  @OneToMany(() => List, (list) => list.user)
  lists?: List[];
}
