import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditService } from '../common/services/audit.service';

@Module({
  imports: [PrismaModule],
  controllers: [EventsController],
  providers: [EventsService, AuditService],
  exports: [EventsService],
})
export class EventsModule {}
