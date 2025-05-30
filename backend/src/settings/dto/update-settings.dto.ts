import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsEmail } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  siteTitle?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  siteLogo?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  address?: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  facebook?: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  twitter?: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  linkedin?: string;
}
