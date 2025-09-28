import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  image_url: string;

  @Column({ default: false })
  is_main: boolean;

  @Column({ type: 'int' })
  product_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  color: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
