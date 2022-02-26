import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('')
  async getAllNews() {
    const news = await this.newsService.getAllNews();

    return news;
  }

  @Get('/:no')
  async getOneNews(@Param('no') no: number) {
    const news = await this.newsService.getOneNews(no);

    return news;
  }
}
