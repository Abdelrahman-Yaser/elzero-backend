import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuditService } from './audit.services';
import { AuditLogPayload } from 'src/interface/product';
@Injectable()
export class AuditListener {
  constructor(private readonly auditService: AuditService) {}

  @OnEvent('audit.log')
  async handleAuditLog(payload: AuditLogPayload) {
    await this.auditService.createAuditlog({
      auditAction: payload.audit_action,
      auditData:
        typeof payload.audit_data === 'object' && payload.audit_data !== null
          ? payload.audit_data
          : ({} as object),
      status: payload.status,
      errorMessage: payload.error_message,
      auditBy: payload.audit_by,
      auditOn:
        payload.audit_on instanceof Date
          ? payload.audit_on.toISOString()
          : payload.audit_on,
    });
  }
}
