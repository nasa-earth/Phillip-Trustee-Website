import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    this.logger.debug(`Required roles: ${requiredRoles?.join(', ') || 'None'}`);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      this.logger.error(
        `ROLES GUARD - No user found in request for ${request.method} ${request.url} - JWT authentication may have failed`,
      );
      throw new UnauthorizedException('No user found in request');
    }

    const hasRole = requiredRoles.includes(user.role);
    this.logger.debug(
      `User role: ${user.role}, Required: ${requiredRoles.join(', ')}, Has access: ${hasRole}`,
    );

    if (!hasRole) {
      this.logger.warn(
        `User ${user.email} with role ${user.role} attempted to access endpoint requiring ${requiredRoles.join(', ')}`,
      );
      throw new UnauthorizedException('Insufficient permissions');
    }

    return hasRole;
  }
}
