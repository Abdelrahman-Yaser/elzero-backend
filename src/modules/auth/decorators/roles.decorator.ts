import { SetMetadata } from '@nestjs/common';

// المفتاح المستخدم في Reflector داخل RolesGuard
export const ROLES_KEY = 'userRoles';

// الديكوريتور نفسه
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
