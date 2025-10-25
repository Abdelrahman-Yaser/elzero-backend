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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from './entities/user.entity';
import { SingInDto } from './dto/singin';
import { ResetPasswordDto } from './dto/resetPassword';
import { UserResponse } from './dto/user-response.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.gurad';
import { Roles } from './decorators/roles.decorator';

@ApiTags('Auth')
@ApiBearerAuth() // ✅ يضيف Authorization header في Swagger
@Controller('auth')
export class AutghController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({
    status: 200,
    description: 'Login success',
    type: UserResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body() singInDto: SingInDto,
  ): Promise<{ user: UserResponse; token: string }> {
    return this.authService.signIn(singInDto);
  }

  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @Patch('reSetPassword')
  reSetPassword(
    @Body() resetPassword: ResetPasswordDto,
  ): Promise<UserEntity | string> {
    return this.authService.reSetPassword(resetPassword);
  }

  @ApiOperation({ summary: 'Add new user (Admin only)' })
  @ApiResponse({ status: 201, description: 'Admin added user successfully' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @ApiOperation({ summary: 'Get specific user by ID (Admin only)' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user information (Admin only)' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAuthDto) {
    return this.authService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by ID (Admin only)' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
