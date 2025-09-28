import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateProductImageDto } from '../../product-images/dto/create-product-image.dto';
import { CreateSizeDto } from '../../sizes/dto/create-size.dto';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount_percent?: number;

  @IsNumber()
  stock_quantity: number;

  @IsOptional()
  @IsNumber()
  final_quantity?: number;

  @IsString()
  brand: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images?: CreateProductImageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSizeDto)
  sizes?: CreateSizeDto[];
}
