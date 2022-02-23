import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';
import { User } from './user.entity';

@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn()
  no: string;

  @Column({ length: 120 })
  comment: string;

  @ManyToOne((type) => User, (user) => user.comment)
  user: User;

  @ManyToOne((type) => News, (news) => news.comment)
  news: News;
}
