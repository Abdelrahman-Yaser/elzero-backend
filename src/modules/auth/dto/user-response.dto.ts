import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Roles } from '../../../common/user-roles';

export class UserResponse {
  @ApiProperty({
    example: '9149f3c2-f797-4926-b677-9c263804cc64',
    description: 'Unique user identifier (UUID)',
  })
  @IsString()
  id!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  @IsString()
  email!: string;

  @ApiPropertyOptional({
    example: '+20123456789',
    description: 'Phone number of the user (optional)',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    example: [Roles.ADMIN],
    description: 'Array of user roles',
    enum: Roles,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;
}
