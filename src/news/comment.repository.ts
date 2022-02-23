import { Comment } from 'src/model/comment.entity';
import { News } from 'src/model/news.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment() {
    const userComment = this.create({});

    try {
      const result = await this.save(userComment);

      console.log(result);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
