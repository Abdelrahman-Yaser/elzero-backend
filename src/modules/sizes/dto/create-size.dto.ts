// src/modules/sizes/dto/create-size.dto.ts
import { IsArray, IsOptional, IsString, Length } from 'class-validator';

export class CreateSizeDto {
  @IsOptional()
  @IsString({ each: true })
  @Length(1, 10, { each: true })
  @IsArray()
  value!: string[];
}
