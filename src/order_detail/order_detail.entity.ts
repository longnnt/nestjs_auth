import { Order } from 'src/order/order.entity';
import { Product } from 'src/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  subtotal: number;

  @OneToOne(() => Product)
  @JoinColumn()
  productId: number;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  orderId: number;
}
