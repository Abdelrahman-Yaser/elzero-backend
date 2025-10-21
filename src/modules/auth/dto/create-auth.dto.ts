import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../../common/user-roles';

export class CreateAuthDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address of the user',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '+20123456789',
    description: 'User phone number (optional)',
    required: false,
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'mypassword123',
    description: 'Password must be at least 6 characters',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    example: ['Admin', 'User'],
    description: 'Array of roles assigned to the user',
    enum: Roles,
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsEnum(Roles, { each: true })
  roles?: Roles[];
}
