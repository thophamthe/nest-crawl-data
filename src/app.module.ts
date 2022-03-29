import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AddressModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
