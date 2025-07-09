import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The question to be answered',
    example: 'What services do you provide?',
  })
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The answer to the question',
    example: 'We provide trustee services...',
  })
  answer: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category of the FAQ',
    example: 'General',
  })
  category: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The display order of the FAQ (optional)',
    example: 1,
  })
  order?: number;
}
