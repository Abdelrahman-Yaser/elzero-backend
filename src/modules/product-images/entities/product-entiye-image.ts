// product-entiye-image.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('product_images')
export class ProductEntityImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('text', { array: true }) // لو عايز تخزن أكتر من رابط صورة
  image_url: string[];
  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string;
  @Column({ default: false })
  is_main: boolean;

  constructor(partial: Partial<ProductEntityImage>) {
    Object.assign(this, partial);
  }
}
