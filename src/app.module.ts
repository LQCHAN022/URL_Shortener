import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url/url.entity';

@Module({
  imports: [
            UrlModule,
            TypeOrmModule.forRoot({
              type: 'sqlite',
              database: 'URL.sqlite',
              entities: [Url],
              synchronize: false, 
            }),
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
