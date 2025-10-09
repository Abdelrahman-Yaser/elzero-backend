import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerService } from 'src/logging/logger.services';
import { Roles } from 'src/common/decorators/roles.decorator';

const logger = new LoggerService('product.controller');
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  private logAudit(
    action: string,
    data: any,
    by = 'system',
    errorMessage: string | null = null,
  ) {
    this.eventEmitter.emit('audit.log', {
      audit_action: action,
      audit_data: JSON.stringify(data),
      status: errorMessage ? 'FAILED' : 'SUCCESS',
      error_message: errorMessage,
      audit_by: by,
      audit_on: 'Product',
    });
  }
  @Roles('ADMIN')
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    try {
      logger.log('Creating a new product');
      const product = await this.productsService.create(dto);
      this.logAudit('CREATE', product);
      return product;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logAudit('READ_ALL', {}, 'system', errorMessage);
      throw err;
    }
  }

  @Get()
  async findAll(@Query('role') role: 'ADMIN' | 'ENGINEER') {
    try {
      logger.log(`Fetching all products - role: ${role}`);
      const products = await this.productsService.findAll();
      this.logAudit('READ_ALL', { role }, 'system');
      return products;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logAudit('READ_ALL', { role }, 'system', errorMessage);
      throw err;
    }
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   try {
  //     const product = await this.productsService.findOne(+id);
  //     this.logAudit('READ_ONE', { id });
  //     return product;
  //   } catch (err) {
  //     this.logAudit('READ_ONE', { id }, 'system', err.message);
  //     throw err;
  //   }
  // }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      logger.log(`Fetching product with id: ${id}`);
      const product = await this.productsService.findOne(id);
      this.logAudit('READ_ONE', { id });
      return product;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logAudit('READ_ALL', {}, 'system', errorMessage);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    try {
      logger.log(`Updating product with id: ${id}`);
      const updated = await this.productsService.update(id, dto);
      this.logAudit('UPDATE', { id, dto });
      return updated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logAudit('UPDATE', { id, dto }, 'system', errorMessage);
      throw err;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      logger.log(`Deleting product with id: ${id}`);
      const result = await this.productsService.remove(+id);
      this.logAudit('DELETE', { id });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logAudit('DELETE', { id }, 'system', errorMessage);
      throw err;
    }
  }
}
