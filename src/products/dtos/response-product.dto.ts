import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

class Pagination {
  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  totalProduct: number;
}

export class ResponseProductDto {
  @ApiProperty({ type: [CreateProductDto] })
  list: CreateProductDto[];

  @ApiProperty({ type: Pagination })
  pagination: Pagination;
}
