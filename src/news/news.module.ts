import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { UserModule } from 'src/user/user.module';
import { NewsRepository } from './news.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      CommentRepository,
      NewsRepository,
    ]),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
