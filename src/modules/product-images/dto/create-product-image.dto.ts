// src/modules/product-images/dto/create-product-image.dto.ts
import { IsString, IsUrl, IsBoolean, IsInt } from 'class-validator';

export class CreateProductImageDto {
  @IsUrl()
  url!: string;

  @IsBoolean()
  is_main!: boolean;

  @IsInt()
  productId!: number;
}
