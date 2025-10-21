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
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductImageDto } from '../../product-images/dto/create-product-image.dto';
import { CreateSizeDto } from '../../sizes/dto/create-size.dto';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ type: Number, description: 'Base price' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Discount percent',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  discount_percent?: number;

  @ApiProperty({ type: Number, description: 'Stock quantity' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  stock_quantity!: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Final quantity (optional)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  final_quantity?: number;

  @ApiProperty({ description: 'Brand name' })
  @IsString()
  @IsNotEmpty()
  brand!: string;

  @ApiProperty({
    type: () => CreateProductImageDto,
    isArray: true,
    required: false,
    description: 'Product images'
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images?: CreateProductImageDto[];

  @ApiProperty({
    type: () => CreateSizeDto,
    isArray: true,
    required: false,
    description: 'Available sizes'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSizeDto)
  sizes?: CreateSizeDto[];
}
