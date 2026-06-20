import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    example: 'Amul Milk',
  })
  @IsString()
  query!: string;
}