import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty()
  @IsInt()
  quantity!: number;

  @ApiProperty()
  @IsString()
  productId!: string;
}