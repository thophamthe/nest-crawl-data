import { CreateSearchDto } from './../search/dto/create-search.dto';
import { AddressService } from './../address/address.service';
import { Injectable } from '@nestjs/common';
import { price, acreage } from './constain';
@Injectable()
export class customURL {
  constructor(private readonly AddressService: AddressService) {}
  customFaceBook(CreateSearchDto: CreateSearchDto) {
    let url = 'https://www.facebook.com/marketplace/category/search/?query=trọ';

    return '';
  }
  customThuePhongTro(CreateSearchDto: CreateSearchDto) {
    let url = 'https://thuephongtro.com/cho-thue-phong-tro-';
    url += CreateSearchDto.district
      ? this.AddressService.getCodeNameDistrict(
          CreateSearchDto.district,
        ).toString()
      : CreateSearchDto.province
      ? this.AddressService.getCodeNameProvince(
          CreateSearchDto.province,
        ).toString()
      : '';
    url += '?';
    url += CreateSearchDto.ward ? `&phuong=${CreateSearchDto.ward}` : '';
    url += CreateSearchDto.price ? `&gia=${CreateSearchDto.price}` : '';

    return url;
  }
  customPhongTro123(CreateSearchDto: CreateSearchDto) {
    let url = 'https://phongtro123.com/tinh-thanh';
    url += CreateSearchDto.province
      ? '/' +
        this.AddressService.getCodeNameProvince(
          CreateSearchDto.province,
        ).toString()
      : '';
    url += CreateSearchDto.district
      ? '/quan-' +
        this.AddressService.getCodeNameDistrict(
          CreateSearchDto.district,
        ).toString()
      : '';
    url += CreateSearchDto.ward
      ? '/' +
        this.AddressService.getCodeNameWard(CreateSearchDto.ward).toString()
      : '';
    url += '?';

    url += CreateSearchDto.price
      ? `gia_tu=${price[CreateSearchDto.price].start}&gia_den=${
          price[CreateSearchDto.price].end
        }`
      : '';

    return url;
  }
}
