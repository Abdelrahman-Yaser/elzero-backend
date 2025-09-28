export interface Product {
  id: number;
  name: string;
  description: string;
}

export interface AuditLogPayload {
  audit_action: string;
  audit_data: unknown;
  status: string;
  error_message?: string;
  audit_by: string;
  audit_on: Date;
}
