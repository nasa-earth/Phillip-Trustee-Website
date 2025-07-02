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
import { AuthResponseDto } from './dto/auth-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface TokenPayload {
  email: string;
  sub: string;
  role: Role;
  tokenId?: string; // Add token identifier
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
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

      const userInfo = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      // Revoke any existing refresh tokens for this user (optional security measure)
      await this.revokeUserRefreshTokens(user.id);

      const tokens = await this.generateTokens(userInfo);

      this.logger.debug(`Login successful for user: ${user.email}`);
      return {
        user: userInfo,
        ...tokens,
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
      this.logger.debug(`User registered successfully: ${registerDto.email}`);

      // Generate tokens with only necessary user info
      const userInfo = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      const tokens = await this.generateTokens(userInfo);

      this.logger.debug(`Generated tokens for user: ${registerDto.email}`);

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
    // Create a token ID for the refresh token
    const refreshTokenId = uuidv4();

    // Access token payload (minimal)
    const accessPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    // Refresh token payload (includes token ID)
    const refreshPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      tokenId: refreshTokenId,
    };

    // Generate access token (short-lived)
    const access_token = this.jwtService.sign(accessPayload, {
      secret: this.configService.get('app.jwt.secret'),
      expiresIn: this.configService.get('app.jwt.expiresIn'),
    });

    // Generate refresh token (long-lived)
    const refresh_token = this.jwtService.sign(refreshPayload, {
      secret:
        this.configService.get('app.jwt.refreshSecret') ||
        this.configService.get('app.jwt.secret'),
      expiresIn: '7d', // Refresh token valid for 7 days
    });

    // Store refresh token in database
    await this.storeRefreshToken(refreshTokenId, user.id, '7d');

    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token: string): Promise<AuthResponseDto> {
    try {
      this.logger.debug('Verifying refresh token');

      // Verify the refresh token
      const payload = this.jwtService.verify(refresh_token, {
        secret:
          this.configService.get('app.jwt.refreshSecret') ||
          this.configService.get('app.jwt.secret'),
      });

      // Check if token ID exists and is valid in database
      if (!payload.tokenId) {
        throw new UnauthorizedException('Invalid refresh token format');
      }

      const storedToken = await this.findRefreshToken(payload.tokenId);
      if (!storedToken || storedToken.revoked) {
        throw new UnauthorizedException(
          'Refresh token is invalid or has been revoked',
        );
      }

      // Get user information
      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Revoke the used refresh token (optional but recommended for security)
      await this.revokeRefreshToken(payload.tokenId);

      // Generate new tokens
      const userInfo = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      const tokens = await this.generateTokens(userInfo);

      // Return new tokens and user info
      return {
        user: userInfo,
        ...tokens,
      };
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string): Promise<{ success: boolean }> {
    try {
      this.logger.debug('Processing logout request');

      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret:
          this.configService.get('app.jwt.refreshSecret') ||
          this.configService.get('app.jwt.secret'),
      });

      // Check if token has ID and revoke it
      if (payload.tokenId) {
        await this.revokeRefreshToken(payload.tokenId);
        this.logger.debug(`Revoked refresh token for user: ${payload.sub}`);
      }

      return { success: true };
    } catch (error) {
      this.logger.error(`Error during logout: ${error.message}`, error.stack);
      // Return success even if token is invalid to prevent information leakage
      return { success: true };
    }
  }

  // Helper methods for refresh token management
  private async storeRefreshToken(
    tokenId: string,
    userId: string,
    expiresIn: string,
  ): Promise<void> {
    try {
      // Convert string like '7d' to milliseconds for expiry date
      const days = parseInt(expiresIn);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);

      await this.prisma.refreshToken.create({
        data: {
          id: tokenId,
          userId: userId,
          expiresAt: expiryDate,
          revoked: false,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to store refresh token: ${error.message}`,
        error.stack,
      );
    }
  }

  private async findRefreshToken(tokenId: string) {
    return await this.prisma.refreshToken.findUnique({
      where: { id: tokenId },
    });
  }

  private async revokeRefreshToken(tokenId: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id: tokenId },
      data: { revoked: true },
    });
  }

  private async revokeUserRefreshTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId: userId, revoked: false },
      data: { revoked: true },
    });
  }
}
