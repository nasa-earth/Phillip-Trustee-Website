import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsDateString, isString, isNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The title of the event',
    })
    title:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'URL-friendly slug',
    })
    slug:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Detailed description of the event',
    })
    description:string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Location of the event',
    })
    location?:string;

    @IsDateString()
    @ApiProperty({
        description: 'Date and time of the event',
    })
    date:string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Image URL for the event',
    })
    thumbnail?:string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({
        default: false,
    })
    isPublished?: boolean;
}
