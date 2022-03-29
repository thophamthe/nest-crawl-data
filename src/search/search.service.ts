import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class SearchService {
  async crawlFacebook(url: string): Promise<any> {
    return { url };
  }
  async crawlThuePhongTro(url: string): Promise<any> {
    const res = await axios.get(url);

    const $ = cheerio.load(res.data); // load HTML
    let listRes = [];
    $('.item-vip5').each((index, el) => {
      const name = $(el).find('h4>a').text();
      const price = $(el).find('.price').text();
      const urlItem = $(el).find('.news-thumb>a').attr('href');
      const acreage = $(el)
        .find('.localtion>.clearfix:nth-child(2)>span:nth-child(1)>b')
        .text();
      const location = $(el)
        .find('.localtion>.clearfix:nth-child(2)>span:nth-child(2)>b')
        .text();
      const desc = $(el).find('.news-desc').text();
      const datetime = $(el).find('.time').text();
      const urlImg = $(el).find('img').attr('data-src');
      const result = {
        source: 'thuephongtro.com',
        name,
        price,
        acreage,
        location,
        desc,
        datetime,
        urlImg,
        urlItem: 'https://thuephongtro.com' + urlItem,
      };

      listRes.push(result);
    });
    return listRes;
  }
  async crawlPhongTro123(url: string): Promise<any> {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data); // load HTML
    let listRes = [];
    $('.section-post-listing>.post-listing >.post-item').each((index, el) => {
      const name = $(el).find('h3').text();
      const price = $(el).find('.post-price').text();
      const urlItem = $(el).find('figure>a').attr('href');
      const acreage = $(el).find('.post-acreage').text();
      const location = $(el).find('.post-location>a').text();
      const desc = $(el).find('.post-summary').text();
      const datetime = $(el).find('.post-time').text();
      const urlImg = $(el).find('figure>img').attr('data-src');
      const result = {
        source: 'phongtro123.com',
        name,
        price,
        acreage,
        location,
        desc,
        datetime,
        urlImg: 'https://phongtro123.com' + urlImg,
        urlItem: 'https://phongtro123.com' + urlItem,
      };

      listRes.push(result);
    });
    return listRes;
  }
}
