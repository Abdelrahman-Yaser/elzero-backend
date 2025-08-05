// src/modules/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tages/entities/tage.entity';
import { Color } from '../colors/entities/color.entity';
import { Size } from '../sizes/entities/size.entity';
import { ProductImage } from '../product-images/entities/product-entiye-image';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private prodRepo: Repository<Product>,

    @InjectRepository(Category)
    private catRepo: Repository<Category>,

    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,

    @InjectRepository(Color)
    private colorRepo: Repository<Color>,

    @InjectRepository(Size)
    private sizeRepo: Repository<Size>,

    @InjectRepository(ProductImage)
    private imageRepo: Repository<ProductImage>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const p = this.prodRepo.create({
      name: dto.name,
      description: dto.description,
      price_original: dto.price_original,
      price_discounted: dto.price_discounted,
      discount_percent: dto.discount_percent,
      in_stock: dto.in_stock ?? true,
    });

    // ربط الفئات
    if (dto.categoryIds?.length) {
      p.categories = await this.catRepo.findByIds(dto.categoryIds);
      if (p.categories.length !== dto.categoryIds.length) {
        throw new NotFoundException('One or more categories not found');
      }
    }

    // ربط التاجات
    if (dto.tagIds?.length) {
      p.tags = await this.tagRepo.findBy({ id: In(dto.tagIds) });
    }

    // ربط الألوان
    if (dto.colorIds?.length) {
      p.colors = await this.colorRepo.findByIds(dto.colorIds);
    }

    // ربط المقاسات
    if (dto.sizeIds?.length) {
      p.sizes = await this.sizeRepo.findByIds(dto.sizeIds);
    }

    // إضافة الصور
    if (dto.imageUrls?.length) {
      p.images = dto.imageUrls.map((url) => this.imageRepo.create({ url }));
    }

    return this.prodRepo.save(p);
  }

  async findAll(): Promise<Product[]> {
    return this.prodRepo.find({
      relations: ['categories', 'tags', 'colors', 'sizes', 'images'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const prod = await this.prodRepo.findOne({
      where: { id },
      relations: ['categories', 'tags', 'colors', 'sizes', 'images'],
    });
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
}
