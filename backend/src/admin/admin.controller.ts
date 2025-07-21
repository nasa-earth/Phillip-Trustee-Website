import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('admin')

export class AdminController {
  constructor(private prisma: PrismaService) {}
  @Get('dashboard')
  async getDashboardData() {
    const now = new Date();

    const [users, events, publishedEvents, partners, faqs] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.event.count(),
      this.prisma.event.count({ where: { published: true } }),
      this.prisma.partner.count(),
      this.prisma.fAQ.count(),
    ]);

    return {
      stats: {
        users,
        events,
        publishedEvents,
        partners,
        faqs,
      },
    };
  }
}
