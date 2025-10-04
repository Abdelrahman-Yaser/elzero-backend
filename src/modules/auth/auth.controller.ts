import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { SingInDto } from './dto/singin';
import { ResetPasswordDto } from './dto/resetPassword';

@Controller('auth')
export class AutghController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('signIn')
  signIn(
    @Body() singinAuthDto: SingInDto,
  ): Promise<string | { user: UserEntity; token: string }> {
    return this.authService.signIn(singinAuthDto);
  }

  @Patch('reSetPassword')
  reSetPassword(
    @Body() resetPassword: ResetPasswordDto,
  ): Promise<UserEntity | string> {
    return this.authService.reSetPassword(resetPassword);
  }
}
