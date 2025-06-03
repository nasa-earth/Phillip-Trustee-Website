import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Prisma } from '@prisma/client';
import { AuditService } from '../common/services/audit.service';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(createEventDto: CreateEventDto, userId: string) {
    try {
      const data = {
        title: createEventDto.title,
        slug: createEventDto.slug,
        description: createEventDto.description,
        date: new Date(createEventDto.startDate),
        location: createEventDto.location,
        thumbnail: createEventDto.thumbnail,
        isPublished: createEventDto.published ?? false,
      };

      const event = await this.prisma.event.create({
        data,
      });

      await this.auditService.log({
        action: 'create',
        entity: 'Event',
        entityId: event.id,
        userId,
        details: `Created event: ${event.title}`,
      });

      return event;
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.error(
          `Event with slug '${createEventDto.slug}' already exists`,
        );
        throw new ConflictException('An event with this slug already exists');
      }
      this.logger.error(
        `Failed to create event: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(publishedOnly = true) {
    try {
      const where = {
        ...(publishedOnly && { isPublished: true }),
      };

      return await this.prisma.event.findMany({
        where,
        orderBy: { date: 'desc' },
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch events: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: string, publishedOnly = true) {
    try {
      const event = await this.prisma.event.findFirst({
        where: {
          id,
          ...(publishedOnly && { isPublished: true }),
        },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID "${id}" not found`);
      }

      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to fetch event ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findBySlug(slug: string, publishedOnly = true) {
    try {
      const event = await this.prisma.event.findFirst({
        where: {
          slug,
          ...(publishedOnly && { isPublished: true }),
        },
      });

      if (!event) {
        throw new NotFoundException(`Event with slug "${slug}" not found`);
      }

      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to fetch event by slug ${slug}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    try {
      const existingEvent = await this.findOne(id, false); // Verify event exists, include unpublished

      const data = {
        ...(updateEventDto.title && { title: updateEventDto.title }),
        ...(updateEventDto.slug && { slug: updateEventDto.slug }),
        ...(updateEventDto.description && {
          description: updateEventDto.description,
        }),
        ...(updateEventDto.startDate && {
          date: new Date(updateEventDto.startDate),
        }),
        ...(updateEventDto.location && { location: updateEventDto.location }),
        ...(updateEventDto.thumbnail && {
          thumbnail: updateEventDto.thumbnail,
        }),
        ...(updateEventDto.published !== undefined && {
          isPublished: updateEventDto.published,
        }),
      };

      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data,
      });

      await this.auditService.log({
        action: 'update',
        entity: 'Event',
        entityId: id,
        userId,
        details: `Updated event: ${existingEvent.title} -> ${updatedEvent.title}`,
      });

      return updatedEvent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'P2002') {
        this.logger.error(
          `Event with slug '${updateEventDto.slug}' already exists`,
        );
        throw new ConflictException('An event with this slug already exists');
      }
      this.logger.error(
        `Failed to update event ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      const event = await this.findOne(id, false); // Verify event exists, include unpublished

      await this.prisma.event.delete({
        where: { id },
      });

      await this.auditService.log({
        action: 'delete',
        entity: 'Event',
        entityId: id,
        userId,
        details: `Deleted event: ${event.title}`,
      });

      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to delete event ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findUpcoming() {
    try {
      return await this.prisma.event.findMany({
        where: {
          isPublished: true,
          date: {
            gte: new Date(),
          },
        },
        orderBy: { date: 'asc' },
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch upcoming events: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
