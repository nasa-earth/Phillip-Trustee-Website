import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

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
}
