import { Injectable } from '@nestjs/common';
import { Like } from './models/like.entity';
import { LikesRepository } from './likes.repository';
import { UUID } from '../common/types';

@Injectable()
export class LikesService {
  constructor(private repository: LikesRepository) {}

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
    let instance = await this.repository.findOne({ where });
    if (instance) {
      if (instance.rating !== rating) {
        instance.rating = rating;
      }
    } else {
      instance = this.repository.create({
        ...where,
        rating,
      });
    }

    await this.repository.save(instance);
    return instance;
  }

  getPostLikesCount(postId: UUID) {
    return this.repository.count({ where: { postId } });
  }
}
