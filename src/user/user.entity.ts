import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Address } from 'src/address/address.entity';
import { Order } from 'src/order/order.entity';
import {
  AfterInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsEmail()
  @Column()
  email: string;

  @Exclude()
  @Column() // good fix
  password: string;

  @Column({ default: 'user' })
  role: string;

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   array: true,
  //   default: [Role.User],
  // })
  // roles: Role[];

  @OneToMany(() => Order, (order) => order.userId)
  orders: Order[];

  @OneToMany(() => Address, (address) => address.userId)
  address: Address[];

  @AfterInsert()
  logAfterInsert() {
    console.log(['Insert User with'], this.id);
  }
}
