import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditEntity } from './entity';
import { Repository } from 'typeorm';
import { CreateAuditDto } from './dto/create-audit.dto';
@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepository: Repository<AuditEntity>,
  ) {}
  async createAuditlog(log: CreateAuditDto): Promise<AuditEntity> {
    const auditLog = this.auditRepository.create(log);
    return this.auditRepository.save(auditLog);
  }
}
