import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import axios from 'axios';
import puppeteer from 'puppeteer';
@Injectable()
export class SearchService {
  async crawlFacebook(url: string): Promise<any> {
    console.log(url);

    let listRes = [];
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    page.setExtraHTTPHeaders({
      authority: ' www.facebook.com',
      method: 'GET',
      path: ' /marketplace/106388046062960/?ref=app_tab',
      scheme: 'https',
      accept:
        ' text/html,application/xhtml+xml,applicatio,n/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language':
        ' vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
      'cache-control': ' max-age=0',
      cookie:
        'sb=rJjEYUVDbJpLJBDnODHe1kgW; datr=rJjEYUY04g1ST-T1Odzzz2pM; c_user=100029756900858; xs=39%3ADTqccy5zdu_YJw%3A2%3A1640274209%3A-1%3A6385%3A%3AAcXif0ari6PZLO4XPyrBc3vUSD0pHEHhXJAQHduMKfzu; fr=0y4ofOgYWj8Hc2d2G.AWX3RGs7bW2cEgDyF8hknNi-bsE.BiRCB6.WO.AAA.0.0.BiRCB6.AWV9wX7XQBU; presence=C%7B%22t3%22%3A%5B%7B%22i%22%3A%22u.100007695280797%22%7D%5D%2C%22utc3%22%3A1648606738505%2C%22v%22%3A1%7D',

      'sec-ch-prefers-color-scheme': 'light',
      'sec-ch-ua':
        ' " Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
      'sec-ch-ua-mobile': ' ?0',
      'sec-ch-ua-platform': 'Windows',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
      'viewport-width': '1518',
    });
    await page.goto(
      'https://www.facebook.com/marketplace/category/search/?query=trọ',
    );
    const content = await page.content();
    const $ = cheerio.load(content);
    $('.kbiprv82').each((index, el) => {
      const name = $(el).find('.a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7').text();
      const price = $(el)
        .find(
          '.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.lr9zc1uh.a8c37x1j.fe6kdd0r.mau55g9w.c8b282yb.keod5gw0.nxhoafnm.aigsh9s9.d3f4x2em.mdeji52x.a5q79mjw.g1cxx5fr.lrazzd5p.oo9gr5id',
        )
        .text()
        .trim();
      const urlItem = $(el).find('a').attr('href');
      const acreage = $(el).find('.re__card-config-area').text();
      const location = $(el)
        .find('.a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7.ltmttdrg.g0qnabr5.ojkyduve')
        .text()
        .trim();
      const desc = $(el).find('.re__card-description').text();
      const datetime = $(el)
        .find('.re__card-published-info-published-at')
        .text()
        .trim();
      const urlImg = $(el).find('.idiwt2bm').attr('src');
      const result = {
        source: 'facebook.com',
        name,
        price,
        acreage,
        location,
        desc,
        datetime,
        urlImg,
        urlItem: 'https://www.facebook.com' + urlItem,
      };

      listRes.push(result);
    });
    await browser.close();
    return listRes;
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
  async crawlBatDongSan(url: string): Promise<any> {
    let listRes = [];
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    const $ = cheerio.load(content);
    $('.js__card').each((index, el) => {
      const name = $(el).find('.js__card-title-full>.js__card-title').text();
      const price = $(el).find('.re__card-config-price').text();
      const urlItem = $(el).find('a').attr('href');
      const acreage = $(el).find('.re__card-config-area').text();
      const location = $(el).find('.re__card-location').text().trim();
      const desc = $(el).find('.re__card-description>div:nth-child(1)').text();
      const datetime = $(el)
        .find('.re__card-published-info-published-at')
        .text()
        .trim();
      const urlImg = $(el).find('.re__card-image>img').attr('data-src');
      const result = {
        source: 'batdongsan.com',
        name,
        price,
        acreage,
        location,
        desc,
        datetime,
        urlImg,
        urlItem: 'https://m.batdongsan.com.vn' + urlItem,
      };
      listRes.push(result);
    });
    await browser.close();
    return listRes;
  }

  async crawlChoTot(url: string): Promise<any> {
    let listRes = [];
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
      width: 1200,
      height: 800,
    });
    await this.autoScroll(page);
    const content = await page.content();
    const $ = cheerio.load(content);
    $('.AdItem_wrapperAdItem__1hEwM').each((index, el) => {
      const name = $(el).find('h3').text();
      const price = $(el).find('.AdBody_adPriceNormal__2_jeN').text();
      const urlItem = $(el).find('.AdItem_wrapperAdItem__1hEwM>a').attr('href');
      const urlImg = $(el).find('.webpimg-container>img').attr('src');
      const acreage = $(el).find('.AdBody_adItemCondition__2aNPA').text();
      const location = $(el)
        .find(
          '.AdItemFooter_wrapperFooter__3vQ7S>.Text_text__qZ9r7>span>.AdItemFooter_item__yl6cI',
        )
        .text();
      const desc = $(el).find('.post-summary').text();
      const datetime = $(el)
        .find(
          '.AdItemFooter_wrapperFooter__3vQ7S>.Text_text__qZ9r7>.AdItemFooter_item__yl6cI',
        )
        .text();
      const result = {
        source: 'chotot.com',
        name,
        price,
        acreage,
        location,
        desc,
        datetime,
        urlImg,
        urlItem: 'https://m.batdongsan.com.vn' + urlItem,
      };
      listRes.push(result);
    });
    await browser.close();
    return listRes;
  }
  async autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve(timer);
          }
        }, 150);
      });
    });
  }
}
