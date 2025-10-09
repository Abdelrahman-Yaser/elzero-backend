import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  image_url: string;

  @IsOptional()
  @IsBoolean()
  is_main: boolean;

  @IsOptional()
  @IsString()
  color: string;
}
