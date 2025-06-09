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
import { Role, User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';

interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponse> {
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  async login(user: UserResponse) {
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

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      this.logger.debug(`Attempting to register user: ${registerDto.email}`);

      // Check if this is the first user
      const userCount = await this.usersService.count();
      const role = userCount === 0 ? Role.ADMIN : Role.EDITOR;

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
        role,
      });

      this.logger.debug(`User registered successfully: ${registerDto.email}`); // Generate tokens with only necessary user info
      const userInfo = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      const tokens = await this.generateTokens(userInfo);

      // Return user info and tokens
      return {
        user: userInfo,
        ...tokens,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      this.logger.error('Registration failed:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }
  private async generateTokens(user: {
    id: string;
    email: string;
    name: string;
    role: Role;
  }) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('app.jwt.secret'),
      expiresIn: this.configService.get('app.jwt.expiresIn'),
    });

    return { access_token };
  }
}
