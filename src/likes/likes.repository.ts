import { EntityRepository, Repository } from 'typeorm';
import { Like } from './models/like.entity';
import { UUID } from '../common/types';

@EntityRepository(Like)
export class LikesRepository extends Repository<Like> {
  async createLike(
    type: 'post' | 'comment',
    id: UUID,
    userId: UUID,
    rating: number,
  ): Promise<Like> {
    const where = {
      [`${type}Id`]: id,
      userId,
    };
    let instance = await this.findOne({ where });
    if (instance) {
      if (instance.rating !== rating) {
        instance.rating = rating;
      }
    } else {
      instance = this.create({
        ...where,
        rating,
      });
    }

    await this.save(instance);
    return instance;
  }

  private async getCountByIds(ids: UUID[], dbField: string, rating = 1) {
    const dbResultField = dbField.toLowerCase();
    const records = await this.createQueryBuilder()
      .select([
        `Like.${dbField} AS ${dbResultField}`,
        'COUNT(Like.id) AS count',
      ])
      .where(`Like.${dbField} IN (:...ids)`, { ids })
      .andWhere('Like.rating = :rating', { rating })
      .groupBy(`Like.${dbField}`)
      .getRawMany();

    const withoutLikes = ids
      .filter((id) => !records.find((record) => record[dbResultField] === id))
      .map((id) => ({ [dbResultField]: id, count: 0 }));

    return [...records, ...withoutLikes];
  }

  async countByPostsIds(
    postsIds: UUID[],
    rating: number,
  ): Promise<{ postid: UUID; count: number }[]> {
    return this.getCountByIds(postsIds, 'postId', rating);
  }

  countByCommentsIds(
    ids: UUID[],
    rating: number,
  ): Promise<{ commentid: UUID; count: number }[]> {
    return this.getCountByIds(ids, 'commentId', rating);
  }
}
