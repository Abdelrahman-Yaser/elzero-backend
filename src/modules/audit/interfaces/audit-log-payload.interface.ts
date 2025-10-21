import { AuditAction } from './audit-action.enum';

export interface AuditLogPayload {
  action: AuditAction;
  audit_data?: Record<string, any>;
  status: 'SUCCESS' | 'FAILED';
  error_message: string;
  audit_by: string;
  audit_on: Date | string;
}
