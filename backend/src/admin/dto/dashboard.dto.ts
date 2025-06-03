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

export class DashboardStatsDto {
  @ApiProperty()
  users: number;

  @ApiProperty()
  posts: number;

  @ApiProperty()
  publishedPosts: number;

  @ApiProperty()
  draftPosts: number;

  @ApiProperty()
  events: number;

  @ApiProperty()
  publishedEvents: number;

  @ApiProperty()
  upcomingEvents: number;

  @ApiProperty()
  partners: number;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  faqs: number;

  @ApiProperty()
  categories: number;
}

export class DashboardResponseDto {
  @ApiProperty()
  stats: DashboardStatsDto;

  @ApiProperty({ type: [DashboardActivityDto] })
  recentActivity: DashboardActivityDto[];
}
