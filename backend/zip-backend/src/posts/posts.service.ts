import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma, Post } from '../../generated/prisma';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    try {
      const data = {
        authorId: userId,
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published ?? false,
        categoryId: createPostDto.categoryId,
        thumbnail: createPostDto.thumbnail,
        slug: createPostDto.slug,
      } satisfies Prisma.PostUncheckedCreateInput;

      return await this.prisma.post.create({
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.error(`Slug '${createPostDto.slug}' already exists`);
        throw new ConflictException('A post with this slug already exists');
      }
      this.logger.error(`Failed to create post: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(categoryId?: string) {
    try {
      const where = {
        published: true,
        ...(categoryId && { categoryId }),
      } satisfies Prisma.PostWhereInput;

      return await this.prisma.post.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to fetch posts: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAllAdmin(categoryId?: string) {
    try {
      const where = categoryId
        ? { categoryId }
        : ({} satisfies Prisma.PostWhereInput);

      return await this.prisma.post.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch admin posts: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: string, publicOnly = true) {
    try {
      const where = {
        id,
        ...(publicOnly && { published: true }),
      } satisfies Prisma.PostWhereInput;

      const post = await this.prisma.post.findFirst({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
      });

      if (!post) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }

      return post;
    } catch (error) {
      this.logger.error(
        `Failed to fetch post ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findBySlug(searchSlug: string, publicOnly = true) {
    try {
      const where = {
        AND: [
          { slug: searchSlug },
          ...(publicOnly ? [{ published: true }] : []),
        ],
      } as Prisma.PostWhereInput;

      const post = await this.prisma.post.findFirst({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
      });

      if (!post) {
        throw new NotFoundException(`Post with slug "${searchSlug}" not found`);
      }

      return post;
    } catch (error) {
      this.logger.error(
        `Failed to fetch post by slug ${searchSlug}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      await this.findOne(id, false); // Verify post exists, include unpublished

      const data = {
        ...(updatePostDto.title && { title: updatePostDto.title }),
        ...(updatePostDto.content && { content: updatePostDto.content }),
        ...(updatePostDto.thumbnail && { thumbnail: updatePostDto.thumbnail }),
        ...(updatePostDto.published !== undefined && {
          published: updatePostDto.published,
        }),
        ...(updatePostDto.categoryId && {
          categoryId: updatePostDto.categoryId,
        }),
        ...(updatePostDto.slug && { slug: updatePostDto.slug }),
      } satisfies Prisma.PostUncheckedUpdateInput;

      return await this.prisma.post.update({
        where: { id },
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.error(`Slug '${updatePostDto.slug}' already exists`);
        throw new ConflictException('A post with this slug already exists');
      }
      this.logger.error(
        `Failed to update post ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id, false); // Verify post exists, include unpublished

      return await this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(
        `Failed to delete post ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
