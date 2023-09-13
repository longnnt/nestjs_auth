import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
@ApiBearerAuth('JWT')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create a new order successfully',
    schema: {
      $ref: getSchemaPath(CreateOrderDto),
    },
  })
  async creatOrder(@Body() body: CreateOrderDto) {
    const order = await this.orderService.create(body);

    return order;
  }

  @Get('/:id')
  async getAllProductByUserId(@Param('id') productId: number) {
    const product = await this.orderService.findByProductId(productId);

    return product;
  }
}
