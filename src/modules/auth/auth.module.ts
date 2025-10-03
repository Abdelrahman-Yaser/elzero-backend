import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { AutghController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AutghController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
