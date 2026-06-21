import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  customer!: string;

  @ApiProperty()
  @IsNumber()
  totalPrice!: number;

  @ApiProperty()
  @IsString()
  status!: string;

  @ApiProperty()
  @IsString()
  productId!: string;
}