import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
  MinLength,
} from 'class-validator';
import { Roles } from '../../common/user-roles';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsArray()
  @IsEnum(Roles, { each: true })
  roles?: Roles[];
}
