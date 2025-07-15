import { Injectable, Logger } from '@nestjs/common';

export type AuditAction = 'create' | 'update' | 'delete' | 'reorder';
export type AuditEntity =
  | 'Post'
  | 'Page'
  | 'FAQ'
  | 'Event'
  | 'EventImage'
  | 'Partner'
  | 'User'
  | 'Category'
  | 'Setting';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  async log(params: {
    action: AuditAction;
    entity: AuditEntity;
    entityId: string;
    userId: string;
    details?: string;
  }) {
    // Log to console since we don't have audit table in database
    this.logger.log(
      `Audit: ${params.action} ${params.entity} (${params.entityId}) by user ${params.userId}${
        params.details ? ` - ${params.details}` : ''
      }`,
    );

    // Return a mock response that matches expected structure
    return {
      id: `audit_${Date.now()}`,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      userId: params.userId,
      details: params.details,
      createdAt: new Date(),
    };
  }

  async getRecentActivity(limit = 10) {
    // Return empty array since we don't have audit table
    this.logger.log(
      'getRecentActivity called - returning empty array (no audit table)',
    );
    return [];
  }
}
