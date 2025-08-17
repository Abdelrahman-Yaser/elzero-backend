// src/modules/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './product.controller';
import { ProductsService } from './products.service';

import { Product } from './entities/product.entity';
// import { Category } from '../categories/entities/category.entity';
// import { Tag } from '../tages/entities/tage.entity';
// import { Color } from '../colors/entities/color.entity';
import { Size } from '../sizes/entities/size.entity';
import { ProductEntityImage } from '../product-images/entities/product-entiye-image';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      // Category,
      // Tag,
      // Color,
      Size,
      ProductEntityImage,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
