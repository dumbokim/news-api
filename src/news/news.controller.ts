import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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

  @Post('/:no/comment')
  async applyComment(
    @Param('no') no: number,
    @Req() req: Request,
    @Body() body: any,
  ) {
    const user = req.user;

    // console.log(user);

    const comment = body.comment;

    const result = await this.newsService.applyComment(no, user, comment);

    if (result) {
      return { message: true };
    } else {
      return { message: false };
    }
  }
}
