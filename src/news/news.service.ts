import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/model/news.entity';
import { Repository } from 'typeorm';
import { Comment } from 'src/model/comment.entity';
import { User } from 'src/model/user.entity';
import { STATUS_CODES } from 'http';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(News) private newsRepository: Repository<News>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async getAllNews() {
    const news = await this.newsRepository
      .createQueryBuilder('news')
      .select(['news.no', 'news.title', 'news.date', 'news.company'])
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

  async applyComment(no: number, userData: Express.User, comment: string) {
    const user = await this.userRepository.findOne({
      name: userData['name'],
      id: userData['id'],
    });

    console.log(user);

    const news = await this.newsRepository.findOne({ no });

    const now = new Date();
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const koreanDiff = 9 * 60 * 60 * 1000;

    const koreanTime = new Date(utcNow + koreanDiff);

    const commentData = {
      user,
      comment,
      news,
      date: koreanTime,
    };

    try {
      await this.commentRepository.save(commentData);

      return true;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
