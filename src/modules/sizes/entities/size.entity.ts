// src/entities/size.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 10, unique: true })
  value!: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  products!: Product[];
}
