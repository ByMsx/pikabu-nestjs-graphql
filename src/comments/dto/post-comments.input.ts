import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { PaginationInput } from '../../common/dto/pagination.input';
import { UUID, UUIDConstructor } from '../../common/types';

export enum CommentsSort {
  CREATED_AT = 'createdAt',
  LIKES_COUNT = 'likesCount',
}

registerEnumType(CommentsSort, { name: 'CommentsSort' });

@InputType()
export class PostCommentsInput extends PaginationInput {
  @Field(() => UUIDConstructor)
  postId: UUID;

  @Field(() => CommentsSort, { nullable: true })
  sort?: CommentsSort;
}
