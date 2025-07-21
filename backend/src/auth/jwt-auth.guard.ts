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
    this.logger.debug('JWT AUTH GUARD - canActivate method called');

    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.debug('JWT AUTH GUARD - Route is public, skipping auth');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    this.logger.debug('JWT AUTH GUARD - Processing protected route');
    this.logger.debug(
      `JWT AUTH GUARD - Auth header: ${authHeader ? 'Present' : 'Missing'}`,
    );
    this.logger.debug(
      `JWT AUTH GUARD - Request: ${request.method} ${request.url}`,
    );

    try {
      // Continue with JWT validation
      const result = super.canActivate(context);
      this.logger.debug(
        `JWT AUTH GUARD - super.canActivate result: ${result instanceof Promise ? 'Promise' : result}`,
      );

      if (result instanceof Promise) {
        return result
          .then((res) => {
            this.logger.debug(`JWT AUTH GUARD - Promise resolved with: ${res}`);
            return res;
          })
          .catch((err) => {
            this.logger.error(
              `JWT AUTH GUARD - Promise rejected with: ${err.message}`,
            );
            throw err;
          });
      }

      return result;
    } catch (error) {
      this.logger.error(
        `JWT AUTH GUARD - Exception in canActivate: ${error.message}`,
      );
      throw error;
    }
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Add custom error handling logic
    if (err || !user) {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
      const authHeader = request.headers.authorization;

      // Log auth failures with context
      this.logger.error(
        `JWT AUTH GUARD - Authentication failed for ${method} ${url}`,
      );
      this.logger.error(
        `JWT AUTH GUARD - Auth header present: ${!!authHeader}`,
      );
      this.logger.error(
        `JWT AUTH GUARD - Error: ${err?.message || 'No error'}`,
      );
      this.logger.error(`JWT AUTH GUARD - Info: ${info?.message || 'No info'}`);

      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token format');
      } else if (info?.name === 'NotBeforeError') {
        throw new UnauthorizedException('Token not active yet');
      }

      throw err || new UnauthorizedException('Authentication required');
    }

    this.logger.debug(
      `JWT AUTH GUARD - Authentication successful for user: ${user.email}`,
    );
    return user;
  }
}
