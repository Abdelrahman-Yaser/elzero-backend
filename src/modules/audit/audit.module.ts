import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.services';
import { AuditEntity } from './entity';
import { AuditListener } from './audit.listener';
// audit.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [AuditService, AuditListener],
  exports: [AuditService],
})
export class AuditModule {}
