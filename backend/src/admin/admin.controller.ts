import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardResponseDto } from './dto/dashboard.dto';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics and overview data' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard data retrieved successfully',
    type: DashboardResponseDto,
  })
  async getDashboardData(): Promise<DashboardResponseDto> {
    const now = new Date();

    const [
      totalUsers,
      adminUsers,
      editorUsers,
      totalEvents,
      publishedEvents,
      totalPartners,
      totalFaqs,
      faqCategories,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
      this.prisma.user.count({ where: { role: 'EDITOR' } }),
      this.prisma.event.count(),
      this.prisma.event.count({ where: { published: true } }),
      this.prisma.partner.count(),
      this.prisma.fAQ.count(),
      this.prisma.fAQ
        .groupBy({
          by: ['category'],
          _count: { category: true },
        })
        .then((groups) => groups.length),
    ]);

    return {
      stats: {
        users: totalUsers,
        usersByRole: {
          admins: adminUsers,
          editors: editorUsers,
          users: totalUsers - adminUsers - editorUsers,
        },
        events: totalEvents,
        publishedEvents,
        draftEvents: totalEvents - publishedEvents,
        partners: totalPartners,
        faqs: totalFaqs,
        faqCategories,
      },
      timestamp: now.toISOString(),
    };
  }
}
