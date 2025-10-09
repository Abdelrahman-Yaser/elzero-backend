import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { AutghController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),

    JwtModule.register({
      global: true,
      secret: 'superSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutghController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
