import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({
    description: 'The name of the partner',
    example: 'Acme Corporation',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL to the partner logo image',
    example: 'https://example.com/logo.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Partner website URL',
    example: 'https://example.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: 'A description of the partner',
    example: 'Leading provider of innovative solutions',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
