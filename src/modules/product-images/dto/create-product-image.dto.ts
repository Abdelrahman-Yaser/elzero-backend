import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  image_url: string;

  @IsOptional()
  @IsBoolean()
  is_main: boolean;

  @IsNumber()
  product_id: number;

  @IsOptional()
  @IsString()
  color: string;
}
