<<<<<<< HEAD
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      this.logger.debug(`Attempting to validate user: ${email}`);
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        this.logger.warn(`User not found: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for user: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password: _, ...result } = user;
      this.logger.debug(`User validated successfully: ${email}`);
      return result;
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`, error.stack);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error during user validation');
    }
  }

  async login(user: any) {
    try {
      this.logger.debug(`Attempting to login user: ${user.email}`);
      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('app.jwt.secret'),
        expiresIn: this.configService.get('app.jwt.expiresIn'),
      });

      this.logger.debug(`Login successful for user: ${user.email}`);
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        access_token: token,
      };
    } catch (error) {
      this.logger.error(
        `Login error for user ${user.email}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error during login');
    }
  }

  async register(registerDto: any) {
    try {
      this.logger.debug(`Attempting to register user: ${registerDto.email}`);

      const existingUser = await this.usersService.findByEmail(
        registerDto.email,
      );
      if (existingUser) {
        this.logger.warn(
          `Registration failed - user already exists: ${registerDto.email}`,
        );
        throw new ConflictException('User already exists');
      }

      const user = await this.usersService.create({
        email: registerDto.email,
        password: registerDto.password,
        name: registerDto.name,
        role: 'EDITOR',
      });

      this.logger.debug(`User registered successfully: ${registerDto.email}`);
      const { password, ...userData } = user;
      const payload = { email: user.email, sub: user.id, role: user.role };

      return {
        user: userData,
        access_token: this.jwtService.sign(payload, {
          secret: this.configService.get('app.jwt.secret'),
          expiresIn: this.configService.get('app.jwt.expiresIn'),
        }),
      };
    } catch (error) {
      this.logger.error(
        `Registration error for ${registerDto.email}: ${error.message}`,
        error.stack,
      );
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error during registration');
    }
  }
}
=======
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {}
>>>>>>> 505917239e023882bbe548340b665dd061797bf9
