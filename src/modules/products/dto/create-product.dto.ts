// src/modules/products/dto/create-product.dto.ts
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price_original: number;

  @IsOptional()
  @IsNumber()
  price_discounted?: number;

  @IsOptional()
  @IsNumber()
  discount_percent?: number;

  @IsOptional()
  @IsBoolean()
  in_stock?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  categoryIds?: number[]; // ربط بالفئات

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  tagIds?: number[]; // ربط بالتاجات

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  colorIds?: number[]; // ربط بالألوان

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  sizeIds?: number[]; // ربط بالمقاسات

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  imageUrls?: string[]; // روابط الصور
}
