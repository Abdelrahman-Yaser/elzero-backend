import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductImage } from '.././product-images/entities/product-image.entity';
import { Size } from '../sizes/entities/size.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly imageRepository: Repository<ProductImage>,

    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  // Get all products with images
  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['images', 'sizes'],
      order: {
        images: { is_main: 'DESC' },
      },
    });
  }

  // Create new product
  async create(dto: CreateProductDto): Promise<Product> {
    const { images, sizes, ...baseData } = dto;

    const product = this.productRepository.create(baseData);

    if (images?.length) {
      product.images = images.map((img) => this.imageRepository.create(img));
    }

    if (sizes?.length) {
      product.sizes = sizes.map((s) =>
        this.sizeRepository.create({
          ...s,
          value: Array.isArray(s.value) ? s.value : [s.value],
        }),
      );
    }

    const savedProduct = await this.productRepository.save(product);

    const fullProduct = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['images', 'sizes'],
    });

    if (!fullProduct) {
      throw new NotFoundException(
        `Product with ID ${savedProduct.id} not found`,
      );
    }

    return fullProduct;
  }

  // Get product by ID
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['images', 'sizes'],
      order: {
        images: { is_main: 'DESC' },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  // Update product with full sync
  async update(id: string, dto: CreateProductDto): Promise<Product> {
    const { images, sizes, ...baseData } = dto;

    const product = await this.productRepository.preload({
      id,
      ...baseData,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Images sync
    if (Array.isArray(images)) {
      // امسح الصور القديمة وحط الجديدة
      await this.imageRepository.delete({ product: { id } });
      product.images = images.map((img) => this.imageRepository.create(img));
    }

    // Sizes sync
    if (Array.isArray(sizes)) {
      await this.sizeRepository.delete({ product: { id } });
      product.sizes = sizes.map((s) =>
        this.sizeRepository.create({
          ...s,
          value: Array.isArray(s.value) ? s.value : [s.value],
        }),
      );
    }

    await this.productRepository.save(product);
    return this.findOne(id as unknown as string);
  }

  // Delete product
  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
