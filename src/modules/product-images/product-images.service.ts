import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntityImage } from './entities/product-entiye-image';
import { CreateProductImageDto } from './dto/create-product-image.dto';
@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ProductEntityImage)
    private readonly imageRepo: Repository<ProductEntityImage>,
  ) {}
  async create(createProductImageDto: CreateProductImageDto) {
    const image = this.imageRepo.create(createProductImageDto);
    return await this.imageRepo.save(image);
  }

  async findAll() {
    return await this.imageRepo.find({ relations: ['product'] });
  }

  async findByProduct(productId: number) {
    return await this.imageRepo.find({
      where: { product: { id: productId } },
    });
  }

  async remove(id: number) {
    await this.imageRepo.delete(id);
    return { deleted: true };
  }
}
