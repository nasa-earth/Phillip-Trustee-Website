import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
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
    description: 'Detailed description of the event',
    example: 'Join us for an evening of charity and celebration...',
  })
  description: string;

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
    description: 'Whether the event is published and visible to public',
    example: true,
    default: false,
  })
  published?: boolean;
}
