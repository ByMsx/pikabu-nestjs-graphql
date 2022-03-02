import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { Comment } from '../../comments/models/comment.entity';
import { UUID } from '../../common/types';
import { CommentsRepository } from '../../comments/comments.repository';

@Injectable()
export class CommentsLoader extends OrderedNestDataLoader<UUID, Comment> {
  constructor(private repo: CommentsRepository) {
    super();
  }

  getOptions = () => ({
    propertyKey: 'id',
    query: (ids: UUID[]) => this.repo.findByIds(ids),
  });
}
