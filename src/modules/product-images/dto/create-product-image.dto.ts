import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductImageDto {
  @ApiProperty({
    description: 'The URL of the product image',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  image_url!: string;

  @ApiPropertyOptional({
    description: 'Flag indicating if this image is the main product image',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_main!: boolean;

  @ApiPropertyOptional({
    description: 'The color associated with the image (if applicable)',
    example: 'red',
  })
  @IsOptional()
  @IsString()
  color!: string;
}
