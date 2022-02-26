import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { News } from 'src/model/news.entity';
import { User } from 'src/model/user.entity';
import { Comment } from 'src/model/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, News, Comment])],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
