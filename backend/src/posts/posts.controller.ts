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
  ConflictException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 409, description: 'Slug already exists.' })
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    try {
      this.logger.log(`Creating new post: ${createPostDto.title}`);
      const post = await this.postsService.create(createPostDto, req.user.id);
      this.logger.log(`Post created successfully: ${post.id}`);
      return post;
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.error(`Slug already exists: ${createPostDto.slug}`);
        throw new ConflictException('A post with this slug already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all published posts' })
  @ApiResponse({ status: 200, description: 'Return all published posts.' })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  findAll(@Query('categoryId') categoryId?: string) {
    return this.postsService.findAll(categoryId);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all posts (including drafts) - Admin only' })
  @ApiResponse({ status: 200, description: 'Return all posts.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  findAllAdmin(@Query('categoryId') categoryId?: string) {
    return this.postsService.findAllAdmin(categoryId);
  }

  @Get('by-slug/:slug')
  @ApiOperation({ summary: 'Get a post by slug' })
  @ApiResponse({ status: 200, description: 'Return the post.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async findBySlug(@Param('slug') slug: string) {
    try {
      return await this.postsService.findBySlug(slug);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Post not found with slug: ${slug}`);
      }
      throw error;
    }
  }

  @Get('by-slug/:slug/preview')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Preview a post by slug (includes drafts)' })
  @ApiResponse({ status: 200, description: 'Return the post.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async previewBySlug(@Param('slug') slug: string) {
    try {
      return await this.postsService.findBySlug(slug, false);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Post not found with slug: ${slug}`);
      }
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, description: 'Return the post.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.postsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Post not found: ${id}`);
      }
      throw error;
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Post successfully updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 409, description: 'Slug already exists.' })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      this.logger.log(`Updating post: ${id}`);
      const post = await this.postsService.update(id, updatePostDto);
      this.logger.log(`Post updated successfully: ${id}`);
      return post;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Post not found: ${id}`);
      } else if (error.code === 'P2002') {
        this.logger.error(`Slug already exists: ${updatePostDto.slug}`);
        throw new ConflictException('A post with this slug already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async remove(@Param('id') id: string) {
    try {
      this.logger.log(`Deleting post: ${id}`);
      const post = await this.postsService.remove(id);
      this.logger.log(`Post deleted successfully: ${id}`);
      return post;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Post not found: ${id}`);
      }
      throw error;
    }
  }
}
