import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [NewsService, AuthService],
  controllers: [NewsController],
})
export class NewsModule {}
