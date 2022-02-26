import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { News } from './news.entity';
import { User } from './user.entity';

@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ length: 120 })
  comment: string;

  @ManyToOne((type) => User, (user) => user.comment)
  user: User;

  @Index()
  @ManyToOne((type) => News, (news) => news.comments)
  news: News;
}
