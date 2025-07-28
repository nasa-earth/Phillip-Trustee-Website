import { ApiProperty } from '@nestjs/swagger';

export class DashboardActivityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  entity: string;

  @ApiProperty()
  user: string;

  @ApiProperty()
  details: string;

  @ApiProperty()
  date: Date;
}

export class UsersByRoleDto {
  @ApiProperty()
  admins: number;

  @ApiProperty()
  editors: number;

  @ApiProperty()
  users: number;
}

export class DashboardStatsDto {
  @ApiProperty()
  users: number;

  @ApiProperty()
  usersByRole: UsersByRoleDto;

  @ApiProperty()
  events: number;

  @ApiProperty()
  publishedEvents: number;

  @ApiProperty()
  draftEvents: number;

  @ApiProperty()
  partners: number;

  @ApiProperty()
  faqs: number;

  @ApiProperty()
  faqCategories: number;
}

export class DashboardResponseDto {
  @ApiProperty()
  stats: DashboardStatsDto;

  @ApiProperty({ type: [DashboardActivityDto] })
  recentActivity?: DashboardActivityDto[];

  @ApiProperty()
  timestamp: string;
}
