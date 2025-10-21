import { IsArray, IsString } from 'class-validator';
export class UserResponse {
  @IsString()
  id!: string;
  @IsString()
  name!: string;
  @IsString()
  email!: string;
  @IsString()
  phoneNumber?: string;
  @IsArray()
  roles?: any; // أو النوع المناسب حسب تصميمك
}
