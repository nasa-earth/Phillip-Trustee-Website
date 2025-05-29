import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ description: 'The title of the page' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The URL slug for the page' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'The HTML or Markdown content of the page' })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Whether the page is published or draft',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
