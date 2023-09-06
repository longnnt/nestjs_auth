import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  async create(body: CreateOrderDto) {
    const isExist = await this.find(body?.userId);

    if (isExist) {
      throw new BadRequestException('order already exists');
    }

    const order = this.orderRepo.create(body);

    return await this.orderRepo.save(order);
  }

  async find(userId: number) {
    return await this.orderRepo
      .createQueryBuilder('order')
      .where('order.userId= :userId', { userId })
      .getOne();
  }

  async findManyByUserId(userId: number) {
    return await this.orderRepo
      .createQueryBuilder('order')
      .select('order.productId')
      .addSelect('order.quantity')
      .where('order.userId= :userId', { userId });
  }

  async findByProductId(productId: number) {
    return await this.orderRepo.find({ where: { id: productId } });
  }
}
