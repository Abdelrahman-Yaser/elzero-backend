import {
  Controller,
  Post,
  Body,
  Patch,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from './entities/user.entity';
import { SingInDto } from './dto/singin';
import { ResetPasswordDto } from './dto/resetPassword';
import { UserResponse } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Auth') // 👈 Group name in Swagger UI
@Controller('auth')
export class AutghController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' }) // 👈 Description
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in.',
    type: UserResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  signIn(
    @Body() singInDto: SingInDto,
  ): Promise<{ user: UserResponse; token: string }> {
    return this.authService.signIn(singInDto);
  }

  @Patch('reSetPassword')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  reSetPassword(
    @Body() resetPassword: ResetPasswordDto,
  ): Promise<UserEntity | string> {
    return this.authService.reSetPassword(resetPassword);
  }
  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Get()
  findAll() {
    const users = this.authService.findAll();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
