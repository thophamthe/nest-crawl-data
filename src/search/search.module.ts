import { AddressService } from './../address/address.service';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { customURL } from './../utils/customURL';
import { SearchController } from './search.controller';

@Module({
  controllers: [SearchController],
  providers: [SearchService, customURL, AddressService],
})
export class SearchModule {}
