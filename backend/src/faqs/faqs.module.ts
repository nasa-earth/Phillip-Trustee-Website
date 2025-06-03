import { Module } from '@nestjs/common';
import { FaqsController } from './faqs.controller';
import { FaqsService } from './faqs.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';

@Module({
  controllers: [FaqsController],
  providers: [FaqsService, PrismaService, AuditService],
  exports: [FaqsService],
})
export class FaqsModule {}
