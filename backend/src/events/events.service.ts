import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.prisma.event.create({
        data: createEventDto,
      });
    } catch (error) {
      this.logger.error(`Failed to create event: ${error.message}`);
      throw error;
    }
  }

  async findAll(publishedOnly = true) {
    try {
      const where = publishedOnly ? { isPublished: true } : {};
      return await this.prisma.event.findMany({
        where,
        orderBy: { date: 'desc' },
      });
    } catch (error) {
      this.logger.error(`Failed to fetch events: ${error.message}`);
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
      this.logger.error(`Failed to fetch event ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      return await this.prisma.event.update({
        where: { id },
        data: updateEventDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update event ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete event ${id}: ${error.message}`);
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
      this.logger.error(`Failed to fetch upcoming events: ${error.message}`);
      throw error;
    }
  }
}