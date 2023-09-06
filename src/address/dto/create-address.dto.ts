import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';
import { DeepPartial } from 'typeorm';

export class CreateAddressDto {
  @IsString()
  address_street: string;

  @IsString()
  city: string;

  @IsNumber()
  @IsNotEmpty()
  userId: DeepPartial<User>;
}
