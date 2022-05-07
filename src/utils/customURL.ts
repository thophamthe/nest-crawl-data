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
    let customDistrict = this.AddressService.getCodeNameDistrict(
      CreateSearchDto.district,
    ).split('-');
    customDistrict.shift();
    const newDistrict = customDistrict.join('-');
    url += CreateSearchDto.district
      ? newDistrict
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
      ? '/' + this.AddressService.getCodeNameProvince(CreateSearchDto.province)
      : '';
    url += CreateSearchDto.district
      ? '/' + this.AddressService.getCodeNameDistrict(CreateSearchDto.district)
      : '';
    url += CreateSearchDto.ward
      ? '/' + this.AddressService.getCodeNameWard(CreateSearchDto.ward)
      : '';
    url += '?';

    url += CreateSearchDto.price
      ? `gia_tu=${price[CreateSearchDto.price].start}&gia_den=${
          price[CreateSearchDto.price].end
        }`
      : '';

    return url;
  }
  customBatDongSan(CreateSearchDto: CreateSearchDto) {
    let url = 'https://m.batdongsan.com.vn/cho-thue-nha-tro-phong-tro-';
    url += CreateSearchDto.district
      ? this.AddressService.getCodeNameDistrict(CreateSearchDto.district)
      : CreateSearchDto.province
      ? this.AddressService.getCodeNameProvince(CreateSearchDto.province)
      : '';
    url += '/';
    /*
    bug: khác mốc giá với các trang khác
    url += CreateSearchDto.price
      ? `gia-tu-${price[CreateSearchDto.price].start / 1000000}-trieu-den-${
          price[CreateSearchDto.price].end / 1000000
        }-trieu`
      : '';
      */
    return url;
  }
  customChoTot(CreateSearchDto: CreateSearchDto) {
    let url = 'https://nha.chotot.com/thue-phong-tro';
    url += CreateSearchDto.ward
      ? '-' + this.AddressService.getCodeNameWard(CreateSearchDto.ward)
      : '';
    url += CreateSearchDto.district
      ? '-' + this.AddressService.getCodeNameDistrict(CreateSearchDto.district)
      : '';
    url += CreateSearchDto.province
      ? '-' + this.AddressService.getCodeNameProvince(CreateSearchDto.province)
      : '';
    url += '?';

    url += CreateSearchDto.price
      ? `price=${price[CreateSearchDto.price].start}-${
          price[CreateSearchDto.price].end
        }`
      : '';

    return url;
  }
}
