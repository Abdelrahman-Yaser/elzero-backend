import { IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discount_percent: number;

  @IsNumber()
  final_price: number;

  @IsNumber()
  stock_quantity: number;

  @IsString()
  brand: string;
}
