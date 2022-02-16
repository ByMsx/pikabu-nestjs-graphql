import { Bookmark } from './models/bookmark.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Bookmark)
export class BookmarksRepository extends Repository<Bookmark> {}
