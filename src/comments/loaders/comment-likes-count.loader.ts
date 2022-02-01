import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { UUID } from '../../common/types';
import { LikesRepository } from '../../likes/likes.repository';

@Injectable()
export class CommentLikesCountLoader extends OrderedNestDataLoader<
  UUID,
  { commentid: UUID; count: number }
> {
  constructor(
    private readonly repo: LikesRepository,
    private readonly rating: number,
  ) {
    super();
  }

  protected getOptions = () => ({
    propertyKey: 'commentid',
    query: (ids: UUID[]) => {
      return this.repo.countByCommentsIds(ids, this.rating);
    },
  });

  private static getProvider(key: string, rating: number) {
    return {
      provide: `Comment${key}CountLoader`,
      useFactory: (repo: LikesRepository) =>
        new CommentLikesCountLoader(repo, rating),
      inject: [LikesRepository],
    };
  }

  static forLikes() {
    return this.getProvider('Likes', 1);
  }

  static forDislikes() {
    return this.getProvider('Dislikes', -1);
  }
}
