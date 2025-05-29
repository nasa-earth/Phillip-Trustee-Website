import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PageOptionsDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;
}
