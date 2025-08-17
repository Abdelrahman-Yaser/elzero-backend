// src/modules/product-images/dto/create-product-image.dto.ts
import { IsUrl, IsBoolean, IsNumber } from 'class-validator';

export class CreateProductImageDto {
  @IsNumber()
  product_id!: number;
  @IsUrl({}, { each: true })
  image_url!: string[];
  @IsBoolean()
  is_main!: boolean;
}
