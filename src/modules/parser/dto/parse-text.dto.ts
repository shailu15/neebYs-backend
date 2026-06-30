import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParseTextDto {
  @ApiProperty({
    example: 'Amul Taaza Milk\nQty 12\nRate 28',
  })
  @IsString()
  text!: string;
}