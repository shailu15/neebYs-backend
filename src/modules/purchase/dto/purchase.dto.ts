import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PurchaseDto {
  @ApiProperty({
    example: 'Received 24 Amul Taaza Milk',
  })
  @IsString()
  message!: string;
}