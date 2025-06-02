import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEmail,
  IsString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @ApiPropertyOptional()
  password?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiPropertyOptional({ enum: Role })
  role?: Role;
}
