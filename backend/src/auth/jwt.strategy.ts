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
      this.logger.debug(
        `JWT validation - Payload received: ${JSON.stringify(payload)}`,
      );

      // Check if user still exists and is active
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        this.logger.warn(
          `JWT validation failed: User ${payload.sub} not found`,
        );
        throw new UnauthorizedException('User no longer exists');
      }

      this.logger.debug(`JWT validation successful for user: ${user.email}`);

      // Return the user object that will be attached to request.user
      const validatedUser = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        name: user.name, // Include name from database
      };

      this.logger.debug(
        `Returning validated user: ${JSON.stringify(validatedUser)}`,
      );

      return validatedUser;
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
