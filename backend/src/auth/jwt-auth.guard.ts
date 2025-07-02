import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Continue with JWT validation
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Add custom error handling logic
    if (err || !user) {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;

      // Log auth failures with context
      this.logger.warn(
        `Authentication failed for ${method} ${url}: ${info?.message || err?.message || 'No user found'}`,
      );

      throw err || new UnauthorizedException('Authentication required');
    }

    return user;
  }
}
