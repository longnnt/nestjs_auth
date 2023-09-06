import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({ default: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  size: number;

  constructor(partial: Partial<PaginationDto>) {
    Object.assign(this, partial);
    this.size = this.size || 10; // Set default value for size
    this.page = this.page || 1; // Set default value for page
  }
}
