import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RecommendationDto {
  @ApiProperty({
    example: 'milk',
  })
  @IsString()
  product!: string;
}