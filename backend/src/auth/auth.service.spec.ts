import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import {
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
    role: Role.EDITOR,
    createdAt: new Date('2025-06-07T00:00:00Z'),
    updatedAt: new Date('2025-06-07T00:00:00Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default ConfigService mock values
    mockConfigService.get.mockImplementation((key: string) => {
      switch (key) {
        case 'app.jwt.secret':
          return 'test-secret';
        case 'app.jwt.expiresIn':
          return '1h';
        case 'app.jwt.refreshSecret':
          return 'refresh-secret';
        case 'app.jwt.refreshExpiresIn':
          return '7d';
        default:
          return undefined;
      }
    });
  });

  describe('validateUser', () => {
    it('should throw UnauthorizedException for non-existent user', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.validateUser('test@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return user data without password for valid credentials', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');

      const { password, ...expectedUser } = mockUser;
      expect(result).toEqual(expectedUser);
    });
  });

  describe('login', () => {
    const userResponse = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: Role.EDITOR,
      createdAt: new Date('2025-06-07T00:00:00Z'),
      updatedAt: new Date('2025-06-07T00:00:00Z'),
    };

    it('should generate tokens and return user info', async () => {
      const mockAccessToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';

      mockJwtService.sign
        .mockReturnValueOnce(mockAccessToken)
        .mockReturnValueOnce(mockRefreshToken);

      const result = await service.login(userResponse);
      expect(result).toEqual({
        user: {
          id: userResponse.id,
          email: userResponse.email,
          name: userResponse.name,
          role: userResponse.role,
        },
        access_token: mockAccessToken,
        refresh_token: mockRefreshToken,
      });
    });
  });

  describe('register', () => {
    const registerDto = {
      email: 'new@example.com',
      password: 'password123',
      name: 'New User',
    };
    it('should create a new user with ADMIN role if first user', async () => {
      mockUsersService.count.mockResolvedValue(0);
      mockUsersService.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const newUser = { ...mockUser, role: Role.ADMIN };
      mockUsersService.create.mockResolvedValue(newUser);
      mockJwtService.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await service.register(registerDto);

      expect(mockUsersService.create).toHaveBeenCalledWith({
        ...registerDto,
        password: 'hashedPassword',
        role: Role.ADMIN,
      });
      expect(result).toBeDefined();
      expect(result).toEqual({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: Role.ADMIN,
        },
        access_token: 'access-token',
        refresh_token: 'refresh-token',
      });
    });
    it('should create a new user with EDITOR role if not first user', async () => {
      mockUsersService.count.mockResolvedValue(1);
      mockUsersService.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      mockUsersService.create.mockResolvedValue(mockUser);
      mockJwtService.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await service.register(registerDto);

      expect(mockUsersService.create).toHaveBeenCalledWith({
        ...registerDto,
        password: 'hashedPassword',
        role: Role.EDITOR,
      });
      expect(result).toBeDefined();
      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        },
        access_token: 'access-token',
        refresh_token: 'refresh-token',
      });
    });
    it('should throw ConflictException if email already exists', async () => {
      const prismaError = {
        code: 'P2002',
        clientVersion: '4.5.0',
        meta: { target: ['email'] },
      };
      mockUsersService.create.mockRejectedValue(prismaError);

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
