<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({
      data: {
        title: createPageDto.title,
        slug: createPageDto.slug,
        content: createPageDto.content,
        published: createPageDto.isPublished ?? false,
      },
    });
  }

  async findAll() {
    return this.prisma.page.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllAdmin() {
    return this.prisma.page.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      throw new NotFoundException(`Page with ID "${id}" not found`);
    }

    return page;
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    await this.findOne(id); // Verify page exists

    return this.prisma.page.update({
      where: { id },
      data: {
        title: updatePageDto.title,
        slug: updatePageDto.slug,
        content: updatePageDto.content,
        published: updatePageDto.isPublished,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verify page exists

    return this.prisma.page.delete({
      where: { id },
    });
  }
}
=======
import { Injectable } from '@nestjs/common';

@Injectable()
export class PagesService {}
>>>>>>> 505917239e023882bbe548340b665dd061797bf9
