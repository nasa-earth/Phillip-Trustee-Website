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
import { CreateEventImageDto } from './dto/create-event-image.dto';

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
        thumbnail: createEventDto.thumbnail,
        published: createEventDto.published ?? false,
      };

      const event = await this.prisma.event.create({
        data,
        include: {
          images: true,
        },
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

  async findAll() {
    try {
      return await this.prisma.event.findMany({
        include: {
          images: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch events: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findPublished() {
    try {
      return await this.prisma.event.findMany({
        where: {
          published: true,
        },
        include: {
          images: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch published events: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const event = await this.prisma.event.findFirst({
        where: { id },
        include: {
          images: true,
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

  async findBySlug(slug: string) {
    try {
      const event = await this.prisma.event.findFirst({
        where: {
          slug,
          published: true, // Only return published events for public access
        },
        include: {
          images: true,
        },
      });

      if (!event) {
        throw new NotFoundException(
          `Event with slug "${slug}" not found or not published`,
        );
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
      const existingEvent = await this.findOne(id); // Verify event exists

      const data = {
        ...(updateEventDto.title && { title: updateEventDto.title }),
        ...(updateEventDto.slug && { slug: updateEventDto.slug }),
        ...(updateEventDto.description && {
          description: updateEventDto.description,
        }),
        ...(updateEventDto.thumbnail && {
          thumbnail: updateEventDto.thumbnail,
        }),
        ...(updateEventDto.published !== undefined && {
          published: updateEventDto.published,
        }),
      };

      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data,
        include: {
          images: true,
        },
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
      const event = await this.findOne(id); // Verify event exists

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

  async findRecent(limit = 10) {
    try {
      return await this.prisma.event.findMany({
        include: {
          images: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch recent events: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async addImageToEvent(
    eventId: string,
    createImageDto: CreateEventImageDto,
    userId: string,
  ) {
    try {
      // Verify event exists
      await this.findOne(eventId);

      const image = await this.prisma.eventImage.create({
        data: {
          url: createImageDto.url,
          eventId: eventId,
        },
      });

      await this.auditService.log({
        action: 'create',
        entity: 'EventImage',
        entityId: image.id,
        userId,
        details: `Added image to event ${eventId}`,
      });

      return image;
    } catch (error) {
      this.logger.error(
        `Failed to add image to event ${eventId}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async removeImageFromEvent(eventId: string, imageId: string, userId: string) {
    try {
      // Verify event and image exist
      await this.findOne(eventId);

      const image = await this.prisma.eventImage.findFirst({
        where: {
          id: imageId,
          eventId: eventId,
        },
      });

      if (!image) {
        throw new NotFoundException(
          `Image with ID "${imageId}" not found for event "${eventId}"`,
        );
      }

      await this.prisma.eventImage.delete({
        where: { id: imageId },
      });

      await this.auditService.log({
        action: 'delete',
        entity: 'EventImage',
        entityId: imageId,
        userId,
        details: `Removed image from event ${eventId}`,
      });

      return image;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove image ${imageId} from event ${eventId}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // Admin-specific methods
  async findAllForAdmin(options: {
    page?: number;
    limit?: number;
    search?: string;
    published?: boolean;
  }) {
    try {
      const { page = 1, limit = 50, search, published } = options;
      const skip = (page - 1) * limit;

      const where: any = {};

      // Add search filter if specified
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
        ];
      }

      // Add published filter if specified
      if (published !== undefined) {
        where.published = published;
      }

      const [events, total] = await Promise.all([
        this.prisma.event.findMany({
          where,
          include: {
            images: true,
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prisma.event.count({ where }),
      ]);

      return {
        events,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch admin events: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOneForAdmin(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
        include: {
          images: true,
        },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to fetch event for admin: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getEventStats() {
    try {
      const [totalEvents] = await Promise.all([this.prisma.event.count()]);

      return {
        total: totalEvents,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch event statistics: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async updatePublishStatus(id: string, published: boolean, userId: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data: { published },
        include: {
          images: true,
        },
      });

      await this.auditService.log({
        action: 'update',
        entity: 'Event',
        entityId: event.id,
        userId,
        details: `${published ? 'Published' : 'Unpublished'} event: ${event.title}`,
      });

      return updatedEvent;
    } catch (error) {
      this.logger.error(
        `Failed to update publish status for event ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
