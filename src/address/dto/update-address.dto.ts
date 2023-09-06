import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  address_street: string;

  @IsString()
  @IsOptional()
  city: string;
}
