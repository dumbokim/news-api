import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('News')
export class News {
  @PrimaryGeneratedColumn()
  no: string;

  @Column({})
  title: string;

  @Column({})
  content: string;

  @OneToMany((type) => Comment, (comment) => comment.news)
  comment: Comment[];
}
