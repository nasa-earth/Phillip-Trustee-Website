import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('app.jwt.secret'),
      ignoreExpiration: false, // Ensure expired tokens are rejected
    });
  }

  async validate(payload: any) {
    try {
      // Check if user still exists and is active
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        this.logger.warn(
          `JWT validation failed: User ${payload.sub} not found`,
        );
        throw new UnauthorizedException('User no longer exists');
      }

      // You could add additional validation here if needed
      // For example, check if user is active, not banned, etc.

      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
