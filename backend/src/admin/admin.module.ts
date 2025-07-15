import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminEventsController } from './events.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { EventsService } from '../events/events.service';

@Module({
  controllers: [AdminController, AdminEventsController],
  providers: [PrismaService, AuditService, EventsService],
})
export class AdminModule {}
