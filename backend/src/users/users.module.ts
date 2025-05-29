import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
<<<<<<< HEAD
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
=======

@Module({
  controllers: [UsersController],
  providers: [UsersService]
>>>>>>> 505917239e023882bbe548340b665dd061797bf9
})
export class UsersModule {}
