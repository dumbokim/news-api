import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  no: string;

  @Column({ length: 120 })
  name: string;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany((type) => Comment, (comment) => comment.user)
  comment: Comment;
}
