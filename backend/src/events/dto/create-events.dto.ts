import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsISO8601,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the event',
    example: 'Annual Charity Gala',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase, contain only letters, numbers, and hyphens, and cannot start or end with a hyphen',
  })
  @ApiProperty({
    description: 'URL-friendly slug for the event',
    example: 'annual-charity-gala-2024',
  })
  slug: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Detailed description of the event in HTML or markdown format',
    example: '# Annual Charity Gala\n\nJoin us for an evening of...',
  })
  description: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Physical or virtual location of the event',
    example: 'Grand Ballroom, City Hotel',
  })
  location?: string;

  @IsISO8601()
  @ApiProperty({
    description: 'Start date and time of the event in ISO8601 format',
    example: '2024-03-15T18:00:00.000Z',
  })
  startDate: string;

  @IsISO8601()
  @ApiProperty({
    description: 'End date and time of the event in ISO8601 format',
    example: '2024-03-15T22:00:00.000Z',
  })
  endDate: string;

  @IsString()
  @IsOptional()
  @Matches(/^(http|https):\/\/.+$/i, {
    message: 'Thumbnail must be a valid HTTP or HTTPS URL',
  })
  @ApiPropertyOptional({
    description: 'URL of the event thumbnail image',
    example: 'https://example.com/images/gala-2024.jpg',
  })
  thumbnail?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Whether the event is published and visible to the public',
    default: false,
    example: false,
  })
  published?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Registration or ticket booking URL',
    example: 'https://eventbrite.com/...',
  })
  registrationUrl?: string;
}
