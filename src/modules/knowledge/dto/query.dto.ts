import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    example: 'Amul',
  })
  @IsString()
  query!: string;
}