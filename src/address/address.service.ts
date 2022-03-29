import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import province from '../data/province.json';
import district from '../data/district.json';
import ward from '../data/ward.json';
@Injectable()
export class AddressService {
  listProvince() {
    return province;
  }
  listDistrict(id: number) {
    return district.filter((item) => item.province_code == id);
  }
  listWard(id: number) {
    return ward.filter((item) => item.district_code == id);
  }
  getCodeNameProvince(id: number): string {
    const getProvince = province.find((item) => item.code == id);
    return getProvince?.codename;
  }
  getCodeNameDistrict(id: number): string {
    const getDistrict = district.find((item) => item.code == id);
    return getDistrict?.codename;
  }
  getCodeNameWard(id: number): string {
    const getWard = ward.find((item) => item.code == id);
    return getWard?.codename;
  }
}
