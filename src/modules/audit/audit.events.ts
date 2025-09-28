// audit.events.ts
import { EventEmitter } from 'events';
import { AuditEntity } from './entity';
import { AuditService } from './audit.services';

export const auditEvent = new EventEmitter();
let auditService: AuditService;

export const setAuditService = (service: AuditService) => {
  auditService = service;
};

auditEvent.on('audit', (audit: Partial<AuditEntity>) => {
  if (!auditService) {
    console.error('AuditService not initialized!');
    return;
  }

  auditService
    .createAuditlog(audit)
    .then(() => console.log('✅ Audit Saved:', audit))
    .catch((err) => console.error('❌ Error saving audit log:', err));
});
