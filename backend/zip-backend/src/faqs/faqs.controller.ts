import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { FaqsService } from './faqs.service';
import { AuditService } from '../common/services/audit.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ReorderFaqsDto } from './dto/reorder-faq.dto';
import { FaqEntity } from './entities/faq.entity';

@ApiTags('faqs')
@Controller('faqs')
export class FaqsController {
  constructor(
    private readonly faqsService: FaqsService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  @ApiResponse({
    status: 200,
    description: 'Returns all FAQs.',
    type: [FaqEntity],
  })
  async findAll(): Promise<FaqEntity[]> {
    return this.faqsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new FAQ' })
  @ApiResponse({
    status: 201,
    description: 'FAQ successfully created.',
    type: FaqEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data.',
  })
  async create(
    @Body() createFaqDto: CreateFaqDto,
    @Req() req: ExpressRequest,
  ): Promise<FaqEntity> {
    try {
      const faq = await this.faqsService.create(createFaqDto);

      await this.auditService.log({
        action: 'create',
        entity: 'FAQ',
        entityId: faq.id,
        userId: req.user.id,
        details: `Created FAQ: ${createFaqDto.question}`,
      });

      return faq;
    } catch (error) {
      throw new BadRequestException('Failed to create FAQ');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a FAQ' })
  @ApiResponse({
    status: 200,
    description: 'FAQ successfully updated.',
    type: FaqEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'FAQ not found.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
    @Req() req: ExpressRequest,
  ): Promise<FaqEntity> {
    try {
      const faq = await this.faqsService.update(id, updateFaqDto);

      await this.auditService.log({
        action: 'update',
        entity: 'FAQ',
        entityId: id,
        userId: req.user.id,
        details: `Updated FAQ: ${faq.question}`,
      });

      return faq;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to update FAQ');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a FAQ' })
  @ApiResponse({
    status: 200,
    description: 'FAQ successfully deleted.',
    type: FaqEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'FAQ not found.' })
  async delete(
    @Param('id') id: string,
    @Req() req: ExpressRequest,
  ): Promise<FaqEntity> {
    try {
      const faq = await this.faqsService.delete(id);

      await this.auditService.log({
        action: 'delete',
        entity: 'FAQ',
        entityId: id,
        userId: req.user.id,
        details: `Deleted FAQ: ${faq.question}`,
      });

      return faq;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete FAQ');
    }
  }

  @Put('reorder')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reorder FAQs' })
  @ApiResponse({
    status: 200,
    description: 'FAQs successfully reordered.',
    type: [FaqEntity],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data.',
  })
  async reorderFaqs(
    @Body() data: ReorderFaqsDto,
    @Req() req: ExpressRequest,
  ): Promise<FaqEntity[]> {
    try {
      const updated = await this.faqsService.reorder(data.faqs);

      await this.auditService.log({
        action: 'reorder',
        entity: 'FAQ',
        entityId: 'multiple',
        userId: req.user.id,
        details: `Reordered ${data.faqs.length} FAQs`,
      });

      return updated;
    } catch (error) {
      throw new BadRequestException('Failed to reorder FAQs');
    }
  }
}
