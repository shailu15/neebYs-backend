import {
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsString()
  category!: string;

  @IsNumber()
  mrp!: number;

  @IsNumber()
  sellingPrice!: number;

  @IsOptional()
  @IsString()
  barcode?: string;
}