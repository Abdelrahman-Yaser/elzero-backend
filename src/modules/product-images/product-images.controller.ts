import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // ✅ إضافة صورة جديدة
  @Post()
  create(@Body() createImageDto: CreateProductImageDto) {
    return this.imagesService.create(createImageDto);
  }

  // ✅ عرض كل الصور
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  // ✅ عرض الصور الخاصة بمنتج معين
  @Get('product/:productId')
  findByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.imagesService.findByProduct(productId);
  }

  // ✅ حذف صورة بالـ id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.remove(id);
  }
}
