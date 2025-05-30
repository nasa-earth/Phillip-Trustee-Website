import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'New Partnership Announcement',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The URL-friendly slug for the post',
    example: 'new-partnership-announcement',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase, contain only letters, numbers, and hyphens, and cannot start or end with a hyphen',
  })
  slug: string;

  @ApiProperty({
    description: 'The content of the post in HTML or markdown format',
    example: '# Exciting News\n\nWe are pleased to announce...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The URL or path to the post thumbnail image',
    required: false,
    example: '/images/partnership.jpg',
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({
    description: 'Whether the post is published and visible to the public',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({
    description: 'The ID of the category this post belongs to',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
