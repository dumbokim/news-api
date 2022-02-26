import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('News')
export class News {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({})
  title: string;

  @Column({})
  content: string;

  @Column({})
  news: string;

  @Column({})
  date: Date;

  @OneToMany((type) => Comment, (comment) => comment.news, {})
  comments: Comment[];
}
