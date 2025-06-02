import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma, Role } from '@prisma/client';

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
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      this.logger.debug(`Successfully created user: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(page = 1, limit = 10, search?: string) {
    try {
      const skip = (page - 1) * limit;

      const where: Prisma.UserWhereInput = search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                email: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {};

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip,
          take: limit,
        }),
        this.prisma.user.count({ where }),
      ]);

      return {
        users,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch users: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Failed to fetch user ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
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
        `Failed to find user by email: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, data: UpdateUserDto & { password?: string }) {
    try {
      await this.findOne(id); // Verify user exists

      // If password is provided, hash it
      const updateData: Prisma.UserUpdateInput = { ...data };
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }

      return await this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to update user ${id}: ${error.message}`,
        error.stack,
      );
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw error;
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id); // Verify user exists
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Failed to delete user ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
