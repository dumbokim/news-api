import { News } from 'src/model/news.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {}
