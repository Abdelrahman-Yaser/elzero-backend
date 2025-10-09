import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';
import { CreateProductImageDto } from '../../product-images/dto/create-product-image.dto';
import { CreateSizeDto } from '../../sizes/dto/create-size.dto';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  discount_percent?: number;

  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  final_quantity?: number;

  @IsString()
  @IsNotEmpty()
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
