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
    const jwtSecret = configService.get('app.jwt.secret');
    console.log('JWT STRATEGY - JWT Secret configured:', !!jwtSecret);
    console.log('JWT STRATEGY - JWT Secret length:', jwtSecret?.length || 0);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false, // Ensure expired tokens are rejected
    });

    this.logger.debug('JWT STRATEGY - Strategy initialized successfully');
  }

  async validate(payload: any) {
    try {
      this.logger.debug(
        `JWT VALIDATION START - User ID: ${payload.sub}, Email: ${payload.email}`,
      );

      // Check if user still exists and is active
      let user;
      try {
        user = await this.usersService.findOne(payload.sub);
        this.logger.debug(`JWT validation - User found: ${user.email}`);
      } catch (error) {
        // Check if it's a NotFoundException (user not found)
        if (error.constructor.name === 'NotFoundException') {
          this.logger.warn(
            `JWT validation failed: User ${payload.sub} not found in database`,
          );
          throw new UnauthorizedException('User no longer exists');
        }
        // Re-throw other errors
        this.logger.error(
          `JWT validation - Database error: ${error.message}`,
          error.stack,
        );
        throw new UnauthorizedException('Database error during validation');
      }

      if (!user) {
        this.logger.error(
          `JWT validation failed: User ${payload.sub} returned null`,
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

      return validatedUser;
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`);
      throw error instanceof UnauthorizedException
        ? error
        : new UnauthorizedException('Invalid token');
    }
  }
}
