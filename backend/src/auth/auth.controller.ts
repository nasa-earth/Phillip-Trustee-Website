import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      this.logger.log(`Registration attempt for email: ${registerDto.email}`);
      const result = await this.authService.register(registerDto);
      this.logger.log(
        `Registration successful for email: ${registerDto.email}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Registration failed for email ${registerDto.email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      this.logger.log(`Login attempt for email: ${loginDto.email}`);
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      const result = await this.authService.login(user);
      this.logger.log(`Login successful for email: ${loginDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Login failed for email ${loginDto.email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'New tokens generated successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthResponseDto> {
    try {
      this.logger.log('Token refresh attempt');
      const result = await this.authService.refreshToken(
        refreshTokenDto.refresh_token,
      );
      this.logger.log('Token refresh successful');
      return result;
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  async logout(@Body() logoutDto: LogoutDto) {
    try {
      this.logger.log('Logout attempt');
      const result = await this.authService.logout(logoutDto.refresh_token);
      this.logger.log('Logout successful');
      return result;
    } catch (error) {
      this.logger.error(`Logout failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Post('debug-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Debug login response' })
  async debugLogin(@Body() loginDto: LoginDto) {
    try {
      this.logger.log(`Debug login attempt for email: ${loginDto.email}`);
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      const result = await this.authService.login(user);
      this.logger.log(`Debug login successful for email: ${loginDto.email}`);
      this.logger.log(`Response structure: ${JSON.stringify(result)}`);
      return {
        success: true,
        responseData: result,
        structureInfo: {
          hasUser: !!result.user,
          hasAccessToken: !!result.access_token,
          hasRefreshToken: !!result.refresh_token,
          keys: Object.keys(result),
          userKeys: result.user ? Object.keys(result.user) : [],
        },
      };
    } catch (error) {
      this.logger.error(
        `Debug login failed for email ${loginDto.email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
