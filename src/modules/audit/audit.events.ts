import { AuditService } from './audit.services';
import { CreateAuditDto } from './dto/create-audit.dto';
import { EventEmitter } from 'node:events';

export const auditEvent = new EventEmitter();
let auditService: AuditService;

export const setAuditService = (service: AuditService) => {
  auditService = service;
};
auditEvent.on('audit', (createAuditDto: CreateAuditDto) => {
  void (async () => {
    if (!auditService) {
      console.error('❌ AuditService not initialized!');
      return;
    }
    try {
      const audit = await auditService.createAuditlog(createAuditDto);
      console.log('✅ Audit Saved:', audit);
    } catch (err) {
      console.error('❌ Error saving audit log:', err);
    }
  })();
});
