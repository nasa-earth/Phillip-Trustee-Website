import { IsArray, ValidateNested, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class FaqOrderItem {
  @ApiProperty({ description: 'FAQ ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'New order position' })
  @IsInt()
  order: number;
}

export class ReorderFaqsDto {
  @ApiProperty({
    type: [FaqOrderItem],
    description: 'Array of FAQs with their new order positions',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqOrderItem)
  faqs: FaqOrderItem[];
}
