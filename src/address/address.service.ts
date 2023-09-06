import { CreateAddressDto } from './dto/create-address.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  create(body: CreateAddressDto) {
    const address = this.addressRepo.create(body);

    return this.addressRepo.save(address);
  }

  async findById(id: number) {
    const [address] = await this.addressRepo.find({ where: { id } });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async update(body: UpdateAddressDto, id: number) {
    const address = await this.findById(id);

    return this.addressRepo.save({ ...address, ...body });
  }
}
