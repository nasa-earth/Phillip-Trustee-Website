import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}
  @Get('dashboard')
  async getDashboardData() {
    const now = new Date();

    const [
      users,
      posts,
      publishedPosts,
      draftPosts,
      events,
      publishedEvents,
      upcomingEvents,
      partners,
      pages,
      faqs,
      categories,
      recentActivity,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.post.count(),
      this.prisma.post.count({ where: { published: true } }),
      this.prisma.post.count({ where: { published: false } }),
      this.prisma.event.count(),
      this.prisma.event.count({ where: { published: true } }),
      this.prisma.event.count({
        where: {
          published: true,
          startDate: {
            gte: now,
          },
        },
      }),
      this.prisma.partner.count(),
      this.prisma.page.count(),
      this.prisma.fAQ.count(),
      this.prisma.category.count(),
      this.prisma.audit.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
    ]);

    return {
      stats: {
        users,
        posts,
        publishedPosts,
        events,
        publishedEvents,
        partners,
        pages,
        faqs,
        categories,
      },
      recentActivity: recentActivity.map((activity) => ({
        id: activity.id,
        action: activity.action,
        section: activity.entity,
        user: activity.user.name,
        date: activity.createdAt,
      })),
    };
  }
}
