import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IUserPayload } from '../interface/user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string>(
      'userRoles',
      context.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // ✅ هنا نصحح طريقة استخراج user
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as IUserPayload;

    if (!user) {
      throw new ForbiddenException('لا يوجد مستخدم مرتبط بالطلب');
    }

    if (!requiredRoles.includes(user.userRoles)) {
      throw new ForbiddenException('غير مصرح لك بالوصول لهذا المورد');
    }

    return true;
  }
}
