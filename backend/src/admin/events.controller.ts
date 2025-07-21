import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { EventsService } from '../events/events.service';
import { CreateEventDto } from '../events/dto/create-events.dto';
import { UpdateEventDto } from '../events/dto/update-event.dto';
import { Request as ExpressRequest } from 'express';

@ApiTags('admin/events')
@Controller('admin/events')

@Roles(Role.ADMIN, Role.EDITOR)
@ApiBearerAuth()
export class AdminEventsController {
  private readonly logger = new Logger(AdminEventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events for admin' })
  @ApiResponse({
    status: 200,
    description: 'Returns all events including unpublished ones.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'published', required: false, type: Boolean })
  async getAllEvents(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('published') published?: boolean,
  ) {
    try {
      const events = await this.eventsService.findAllForAdmin({
        page: page ? parseInt(page.toString()) : 1,
        limit: limit ? parseInt(limit.toString()) : 50,
        search,
        published,
      });
      return events;
    } catch (error) {
      this.logger.error('Failed to fetch admin events', error);
      throw error;
    }
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get event statistics' })
  @ApiResponse({ status: 200, description: 'Returns event statistics.' })
  async getEventStats() {
    try {
      const stats = await this.eventsService.getEventStats();
      return stats;
    } catch (error) {
      this.logger.error('Failed to fetch event statistics', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID for admin' })
  @ApiResponse({ status: 200, description: 'Returns the event.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async getEvent(@Param('id') id: string) {
    try {
      return await this.eventsService.findOneForAdmin(id);
    } catch (error) {
      this.logger.error(`Failed to fetch event ${id}`, error);
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event successfully created.' })
  @ApiResponse({
    status: 409,
    description: 'Event with this slug already exists.',
  })
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Request() req: ExpressRequest,
  ) {
    try {
      this.logger.log(`Creating new event: ${createEventDto.title}`);
      return await this.eventsService.create(createEventDto, req.user.id);
    } catch (error) {
      this.logger.error('Failed to create event', error);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'Event successfully updated.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({
    status: 409,
    description: 'Event with this slug already exists.',
  })
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req: ExpressRequest,
  ) {
    try {
      this.logger.log(`Updating event: ${id}`);
      return await this.eventsService.update(id, updateEventDto, req.user.id);
    } catch (error) {
      this.logger.error(`Failed to update event ${id}`, error);
      throw error;
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN) // Only admins can delete events
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'Event successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async deleteEvent(@Param('id') id: string, @Request() req: ExpressRequest) {
    try {
      this.logger.log(`Deleting event: ${id}`);
      return await this.eventsService.remove(id, req.user.id);
    } catch (error) {
      this.logger.error(`Failed to delete event ${id}`, error);
      throw error;
    }
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish an event' })
  @ApiResponse({ status: 200, description: 'Event successfully published.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async publishEvent(@Param('id') id: string, @Request() req: ExpressRequest) {
    try {
      this.logger.log(`Publishing event: ${id}`);
      return await this.eventsService.updatePublishStatus(
        id,
        true,
        req.user.id,
      );
    } catch (error) {
      this.logger.error(`Failed to publish event ${id}`, error);
      throw error;
    }
  }

  @Patch(':id/unpublish')
  @ApiOperation({ summary: 'Unpublish an event' })
  @ApiResponse({ status: 200, description: 'Event successfully unpublished.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async unpublishEvent(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ) {
    try {
      this.logger.log(`Unpublishing event: ${id}`);
      return await this.eventsService.updatePublishStatus(
        id,
        false,
        req.user.id,
      );
    } catch (error) {
      this.logger.error(`Failed to unpublish event ${id}`, error);
      throw error;
    }
  }
}
