import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customerName!: string;

  @IsString()
  customerEmail!: string;

  @IsString()
  customerPhone!: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDto)
  items!: CreateOrderDto[];
  productId: any;
  quantity: any;
}
