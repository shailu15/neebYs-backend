import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChatDto {
  @ApiProperty({
    example: 'show inventory',
  })
  @IsString()
  message!: string;
}