import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FAQ } from '@prisma/client';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<FAQ[]> {
    return this.prisma.fAQ.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async findById(id: string): Promise<FAQ> {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    return faq;
  }

  async create(data: CreateFaqDto): Promise<FAQ> {
    // If no order is provided, put it at the end
    if (typeof data.order === 'undefined') {
      const lastFaq = await this.prisma.fAQ.findFirst({
        orderBy: { order: 'desc' },
      });
      data.order = lastFaq ? lastFaq.order + 1 : 0;
    }

    return this.prisma.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
        order: data.order,
      },
    });
  }

  async update(id: string, data: UpdateFaqDto): Promise<FAQ> {
    // Verify FAQ exists
    await this.findById(id);

    return this.prisma.fAQ.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<FAQ> {
    // Verify FAQ exists
    await this.findById(id);

    return this.prisma.fAQ.delete({
      where: { id },
    });
  }

  async reorder(faqs: { id: string; order: number }[]): Promise<FAQ[]> {
    // Verify all FAQs exist
    await Promise.all(
      faqs.map(async (faq) => {
        await this.findById(faq.id);
      }),
    );

    // Update orders in a transaction
    const updates = faqs.map((faq) =>
      this.prisma.fAQ.update({
        where: { id: faq.id },
        data: { order: faq.order },
      }),
    );

    await this.prisma.$transaction(updates);
    return this.findAll();
  }
}
