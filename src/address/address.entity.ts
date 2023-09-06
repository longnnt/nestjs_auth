import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// important decorators
@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address_street: string;

  @Column()
  city: string;

  @ManyToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'userId' })
  userId: User;
}
