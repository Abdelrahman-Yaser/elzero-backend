import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, array: true })
  value!: string[]; // مصفوفة من المقاسات

  @ManyToOne(() => Product, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
