import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { AutghController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // to can access env variables from anywhere
    ConfigModule.forRoot({
      isGlobal: true, // عشان تقدر تستخدمه في أي مكان من غير ما تعيد استيراده
    }),
    // global jwt module
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutghController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
