import { Length } from 'class-validator';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';
import { sharedConstrains } from '../../../shared';

const { listTitle } = sharedConstrains;

@Entity()
export class Product extends BaseEntity {
  @Length(listTitle.min, listTitle.max)
  @PrimaryColumn()
  name!: string;
}
