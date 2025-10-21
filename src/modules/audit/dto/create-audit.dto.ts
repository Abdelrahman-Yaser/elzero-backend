import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  auditAction!: string;

  @IsOptional()
  @IsObject()
  auditData?: object;

  @IsString()
  status!: string;

  @IsOptional()
  @IsString()
  errorMessage?: string;

  @IsString()
  auditBy!: string;

  @IsString()
  auditOn!: string;
}
