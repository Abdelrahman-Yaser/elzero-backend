// import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Product } from '../../products/entities/product.entity';
// @Entity('tags')
// export class Tag {
//   @PrimaryGeneratedColumn()
//   id!: number;
//   @Column({ length: 100, unique: true })
//   name!: string;

//   @ManyToMany((): typeof Product => Product, (product: Product) => product.tags)
//   products!: Product[];
// }
