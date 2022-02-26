import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/model/news.entity';
import { Repository } from 'typeorm';
import { Comment } from 'src/model/comment.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async getAllNews() {
    const news = await this.newsRepository
      .createQueryBuilder('news')
      .select(['news.no', 'news.title', 'news.date', 'news.news'])
      .getMany();

    return news;
  }

  async getOneNews(no: number) {
    const news = await this.newsRepository.findOne({ no });

    const comment = await this.getComments(news);
    return { news, comment };
  }

  async getComments(news: News) {
    const comment = await this.commentRepository.find({
      news,
    });

    return comment;
  }
}
