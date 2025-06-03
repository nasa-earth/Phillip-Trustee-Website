import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export type AuditAction = 'create' | 'update' | 'delete' | 'reorder';
export type AuditEntity = 'Post' | 'Page' | 'FAQ' | 'Event' | 'Partner' | 'User' | 'Category' | 'Setting';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(params: {
    action: AuditAction;
    entity: AuditEntity;
    entityId: string;
    userId: string;
    details?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        userId: params.userId,
        details: params.details,
      }
    });
  }

  async getRecentActivity(limit = 10) {
    return this.prisma.auditLog.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });
  }
}
