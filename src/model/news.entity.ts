import {
  Column,
  Entity,
  IsNull,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  company: string;

  @Column({})
  date: Date;

  @OneToMany((type) => Comment, (comment) => comment.news, {})
  comments: Comment[];
}
