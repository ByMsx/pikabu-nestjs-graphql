import { Injectable } from '@nestjs/common';
import { UUID } from '../../common/types';
import { LikesRepository } from '../../likes/likes.repository';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';

@Injectable()
export class PostLikesCountLoader extends OrderedNestDataLoader<
  UUID,
  { count: number }
> {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly rating: number,
  ) {
    super();
  }

  protected getOptions = () => ({
    propertyKey: 'postid',
    query: async (
      keys: Array<UUID>,
    ): Promise<{ postid: UUID; count: number }[]> => {
      return this.likesRepository.countByPostsIds(keys, this.rating);
    },
  });

  private static getProvider(key: string, rating: number) {
    return {
      provide: `Post${key}CountLoader`,
      useFactory: (repo: LikesRepository) =>
        new PostLikesCountLoader(repo, rating),
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
