import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { UUID } from '../types';
import { PostPayload } from '../../posts/dto/output/post.payload';
import { PostsRepository } from '../../posts/posts.repository';

@Injectable()
export class PostsLoader extends OrderedNestDataLoader<UUID, PostPayload> {
  constructor(private readonly repo: PostsRepository) {
    super();
  }

  getOptions = () => ({
    propertyKey: 'id',
    query: (ids: UUID[]) => {
      return this.repo.findByIds(ids);
    },
  });
}
