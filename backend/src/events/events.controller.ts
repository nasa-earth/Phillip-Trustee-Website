import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Query,
  NotFoundException,
  ConflictException,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { Role } from '@prisma/client';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request as ExpressRequest } from 'express';
import { CreateEventImageDto } from './dto/create-event-image.dto';

@ApiTags('events')
@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 409,
    description: 'Event with this slug already exists.',
  })
  create(
    @Body() createEventDto: CreateEventDto,
    @Request() req: ExpressRequest,
  ) {
    try {
      this.logger.log(`Creating new event: ${createEventDto.title}`);
      return this.eventsService.create(createEventDto, req.user.id);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw error;
    }
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all published events (public)' })
  @ApiResponse({ status: 200, description: 'Returns all published events.' })
  findPublished() {
    return this.eventsService.findPublished();
  }

  @Get('admin/all')
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all events (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns all events including unpublished.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('recent')
  @Public()
  @ApiOperation({ summary: 'Get recent events' })
  @ApiResponse({
    status: 200,
    description: 'Returns recent events.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of events to return (default: 10)',
  })
  findRecent(@Query('limit') limit?: number) {
    return this.eventsService.findRecent(
      limit ? parseInt(limit.toString()) : 10,
    );
  }

  @Get('by-slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get an event by slug' })
  @ApiResponse({ status: 200, description: 'Returns the event.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get an event by id' })
  @ApiResponse({ status: 200, description: 'Returns the event.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'Event successfully updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({
    status: 409,
    description: 'Event with this slug already exists.',
  })
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req: ExpressRequest,
  ) {
    try {
      this.logger.log(`Updating event: ${id}`);
      return this.eventsService.update(id, updateEventDto, req.user.id);
    } catch (error) {
      if (error instanceof ConflictException) {
        this.logger.error(`Slug already exists: ${updateEventDto.slug}`);
      }
      throw error;
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'Event successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    try {
      this.logger.log(`Deleting event: ${id}`);
      return this.eventsService.remove(id, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Event not found: ${id}`);
      }
      throw error;
    }
  }

  @Post(':id/images')
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add an image to an event' })
  @ApiResponse({
    status: 201,
    description: 'Image successfully added to event.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  addImageToEvent(
    @Param('id') id: string,
    @Body() createEventImageDto: CreateEventImageDto,
    @Request() req: ExpressRequest,
  ) {
    try {
      this.logger.log(`Adding image to event: ${id}`);
      return this.eventsService.addImageToEvent(
        id,
        createEventImageDto,
        req.user.id,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id/images/:imageId')
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove an image from an event' })
  @ApiResponse({
    status: 200,
    description: 'Image successfully removed from event.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event or image not found.' })
  removeImageFromEvent(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @Request() req: ExpressRequest,
  ) {
    try {
      this.logger.log(`Removing image ${imageId} from event: ${id}`);
      return this.eventsService.removeImageFromEvent(id, imageId, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Event or image not found: ${id}/${imageId}`);
      }
      throw error;
    }
  }
}
