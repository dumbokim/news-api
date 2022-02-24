import { Comment } from 'src/model/comment.entity';
import { News } from 'src/model/news.entity';
import { User } from 'src/model/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser() {
    const user = this.create({});

    try {
      const result = await this.save(user);

      console.log(result);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
