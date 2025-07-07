import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventImageDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(http|https):\/\/.+$/i, {
    message: 'URL must be a valid HTTP or HTTPS URL',
  })
  @ApiProperty({
    description: 'URL of the event image',
    example: 'https://example.com/images/event-photo-1.jpg',
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the event this image belongs to',
    example: 'uuid-of-event',
  })
  eventId: string;
}
