import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  providers: [OrderDetailService],
  controllers: [OrderDetailController],
})
export class OrderDetailModule {}
