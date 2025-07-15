import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('partners')
@Controller('partners')
export class PartnersController {
  private readonly logger = new Logger(PartnersController.name);

  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new partner' })
  @ApiResponse({ status: 201, description: 'Partner successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPartnerDto: CreatePartnerDto, @Request() req) {
    this.logger.debug(`Creating partner - User: ${JSON.stringify(req.user)}`);
    this.logger.debug(`Partner data: ${JSON.stringify(createPartnerDto)}`);
    return this.partnersService.create(createPartnerDto);
  }

  @Post('test')
  @ApiOperation({ summary: 'Create a new partner (test endpoint)' })
  @ApiResponse({ status: 201, description: 'Partner successfully created.' })
  createTest(@Body() createPartnerDto: CreatePartnerDto) {
    this.logger.debug(`Creating partner via test endpoint`);
    this.logger.debug(`Partner data: ${JSON.stringify(createPartnerDto)}`);
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all partners' })
  @ApiResponse({ status: 200, description: 'Returns all partners.' })
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a partner by ID' })
  @ApiResponse({ status: 200, description: 'Returns the partner.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a partner' })
  @ApiResponse({ status: 200, description: 'Partner successfully updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a partner' })
  @ApiResponse({ status: 200, description: 'Partner successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  remove(@Param('id') id: string, @Request() req) {
    this.logger.debug(
      `Deleting partner ${id} - User: ${JSON.stringify(req.user)}`,
    );
    return this.partnersService.remove(id);
  }

  @Delete('test/:id')
  @ApiOperation({ summary: 'Delete a partner (test endpoint)' })
  @ApiResponse({ status: 200, description: 'Partner successfully deleted.' })
  removeTest(@Param('id') id: string) {
    this.logger.debug(`Deleting partner via test endpoint: ${id}`);
    return this.partnersService.remove(id);
  }
}
