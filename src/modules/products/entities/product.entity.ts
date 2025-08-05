// products/entities/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Color } from '../../colors/entities/color.entity';
// import { Tag } from '../../tags/entities/tag.entity';
import { Size } from '../../sizes/entities/size.entity';
import { ProductImage } from '../../product-images/entities/product-entiye-image';
import { Tag } from 'src/modules/tages/entities/tage.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price_original: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price_discounted?: number;

  @Column({ nullable: true, type: 'int' })
  discount_percent?: number;

  @Column({ default: true })
  in_stock: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({ name: 'product_tags' })
  tags: Tag[];

  @ManyToMany(() => Color, { cascade: true })
  @JoinTable({ name: 'product_colors' })
  colors: Color[];

  @ManyToMany(() => Size, { cascade: true })
  @JoinTable({ name: 'product_sizes' })
  sizes: Size[];

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];
}
