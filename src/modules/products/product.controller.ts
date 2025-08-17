import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }
  @Post()
  create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.create(product);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() product: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
