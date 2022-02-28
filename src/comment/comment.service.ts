import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/model/comment.entity';
import { News } from 'src/model/news.entity';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}

  async getAllComments(userData: Express.User) {
    const user = await this.userRepository.findOne({
      name: userData['name'],
      id: userData['id'],
    });

    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .orderBy('news.no', 'DESC')
      .leftJoin('comment.news', 'news')
      .addSelect(['news.title', 'news.no'])
      .where({ user })
      .getMany();

    return comments;
  }
}
