// src/modules/sizes/dto/create-size.dto.ts
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateSizeDto {
  @IsOptional()
  @IsString()
  @Length(1, 10)
  value!: string;
}
