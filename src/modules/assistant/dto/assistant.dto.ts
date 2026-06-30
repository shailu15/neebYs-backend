import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssistantDto {
  @ApiProperty({
    example: 'milk',
  })
  @IsString()
  query!: string;
}