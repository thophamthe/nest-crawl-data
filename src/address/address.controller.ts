import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/provinces')
  findProvince() {
    return this.addressService.listProvince();
  }
  @Get('/:id/districts')
  findDistrict(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.listDistrict(id);
  }
  @Get('/:id/wards')
  findWard(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.listWard(id);
  }
}
