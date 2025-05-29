import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      this.logger.debug(`Creating new user with email: ${data.email}`);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          role: data.role || 'EDITOR',
        },
      });
      this.logger.debug(`Successfully created user: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new InternalServerErrorException(
            'Database constraint violation',
          );
        }
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string) {
    try {
      this.logger.debug(`Finding user by email: ${email}`);
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (user) {
        this.logger.debug(`Found user: ${email}`);
      } else {
        this.logger.debug(`No user found with email: ${email}`);
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Error finding user by email: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async findAll() {
    try {
      this.logger.debug('Finding all users');
      return await this.prisma.user.findMany();
    } catch (error) {
      this.logger.error(
        `Error finding all users: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }
}
