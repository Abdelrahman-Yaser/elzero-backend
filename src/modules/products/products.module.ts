import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './product.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Size } from '../sizes/entities/size.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule, // ✅ هنا من غير forRoot()
    TypeOrmModule.forFeature([Product, Size, ProductImage]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
