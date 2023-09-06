import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() body: CreateAddressDto) {
    const address = this.addressService.create(body);

    return address;
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.addressService.findById(id);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateAddressDto, @Param('id') id: number) {
    this.addressService.update(body, id);

    return new HttpException('Update successful', HttpStatus.OK);
  }
}
