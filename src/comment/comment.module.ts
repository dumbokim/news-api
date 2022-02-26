import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { Comment } from 'src/model/comment.entity';
import { News } from 'src/model/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, News])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
