import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('audit_logs')
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auditAction: string;

  @Column({ type: 'jsonb', nullable: true })
  auditData: object;

  @Column()
  status: string;

  @Column({ nullable: true })
  errorMessage: string;

  @Column()
  auditBy: string;

  @Column()
  auditOn: string;

  @CreateDateColumn()
  createdAt: Date;
}
