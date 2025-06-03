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
import { Role } from '@prisma/client';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request as ExpressRequest } from 'express';

@ApiTags('events')
@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @ApiOperation({ summary: 'Get all published events' })
  @ApiResponse({ status: 200, description: 'Returns all published events.' })
  findAll() {
    return this.eventsService.findAll(true);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all events (including drafts) - Admin only' })
  @ApiResponse({ status: 200, description: 'Returns all events.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAllAdmin() {
    return this.eventsService.findAll(false);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming published events' })
  @ApiResponse({
    status: 200,
    description: 'Returns all upcoming published events.',
  })
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @Get('by-slug/:slug')
  @ApiOperation({ summary: 'Get an event by slug' })
  @ApiResponse({ status: 200, description: 'Returns the event.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @Get('by-slug/:slug/preview')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Preview an event by slug (includes drafts)' })
  @ApiResponse({ status: 200, description: 'Returns the event.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  previewBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug, false);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by id' })
  @ApiResponse({ status: 200, description: 'Returns the event.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
}
