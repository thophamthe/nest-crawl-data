import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { customURL } from './../utils/customURL';
import { CreateSearchDto } from './dto/create-search.dto';

@Controller('search')
export class SearchController {
  constructor(
    private readonly search: SearchService,
    private readonly custom: customURL,
  ) {}
  @Post('/:param')
  async create(
    @Param('param') param: string,
    @Body() createSearchDto: CreateSearchDto,
  ): Promise<any> {
    let dataResult;
    let url = '';
    switch (param) {
      case 'facebook':
        url = this.custom.customFaceBook(createSearchDto);
        dataResult = await this.search.crawlFacebook(url);
        break;

      case 'thuephongtro':
        url = this.custom.customThuePhongTro(createSearchDto);
        dataResult = await this.search.crawlThuePhongTro(url);
        break;
      case 'phongtro123':
        url = this.custom.customPhongTro123(createSearchDto);
        dataResult = await this.search.crawlPhongTro123(url);
        break;
      case 'batdongsan':
        url = this.custom.customBatDongSan(createSearchDto);

        dataResult = await this.search.crawlBatDongSan(url);
        break;
      case 'chotot':
        url = this.custom.customChoTot(createSearchDto);
        dataResult = await this.search.crawlChoTot(url);
        break;
      default:
        dataResult = [];
        break;
    }
    return dataResult;
  }
}
