import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntityImage } from './entities/product-entiye-image';
import { ImagesService } from './product-images.service';
import { ImagesController } from './product-images.controller';
import { ProductsModule } from '../products/products.module'; // 👈 مهم عشان العلاقة

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntityImage]),
    ProductsModule, // 👈 عشان اقدر اجيب الـ Product لما اضيف صورة
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ProductImagesModule {}
