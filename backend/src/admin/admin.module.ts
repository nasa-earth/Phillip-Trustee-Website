import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminPostsController } from './posts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';

@Module({
  controllers: [AdminController, AdminPostsController],
  providers: [PrismaService, AuditService],
})
export class AdminModule {}
