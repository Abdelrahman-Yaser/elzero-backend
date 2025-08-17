import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Get all products with images
  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['images'],
    });
  }

  // Create a new product
  // Create a new product
  async create(productDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(productDto);
    const savedProduct = await this.productRepository.save(product);

    const productWithImages = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['images', 'sizes'],
      order: {
        images: {
          is_main: 'DESC', // ترتيب الصور بحيث تكون الصورة الرئيسية أولاً
        },
      },
    });

    if (!productWithImages) {
      throw new NotFoundException(
        `Product with ID ${savedProduct.id} not found after creation`,
      );
    }

    return productWithImages;
  }

  // Get a single product by ID with images
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['images', 'sizes'],
      order: {
        images: {
          is_main: 'DESC', // ترتيب الصور بحيث تكون الصورة الرئيسية أولاً
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  // Update product
  async update(id: number, productDto: CreateProductDto): Promise<Product> {
    await this.productRepository.update(id, productDto);
    return this.findOne(id); // ترجع المنتج مع الصور بعد التحديث
  }

  // Delete product by ID
  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
