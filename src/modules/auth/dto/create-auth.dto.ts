import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Roles } from '../../../common/user-roles';

export class CreateAuthDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address of the user',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    example: '+20123456789',
    description: 'User phone number',
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

  @ApiPropertyOptional({
    example: Roles.ADMIN,
    description: 'User role',
    enum: Roles,
  })
  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;
}
