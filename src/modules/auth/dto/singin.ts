import { IsString, MinLength } from 'class-validator';

export class SingInDto {
  @IsString()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}
