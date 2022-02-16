import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { PaginationInput } from '../../../common/dto/pagination.input';

export enum PostsSort {
  CREATION_DATE = 'creationDate',
  LIKES_COUNT = 'likes',
}

export enum PostCategory {
  HOT = 'hot',
  NEWEST = 'newest',
  BEST = 'best',
}

registerEnumType(PostsSort, { name: 'PostsSort' });
registerEnumType(PostCategory, { name: 'PostCategory' });

@InputType()
export class PostsFilter {
  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => String, { nullable: true })
  title?: string;
}

@InputType()
export class GetPostsInput extends PaginationInput {
  @Field(() => PostCategory, { nullable: true })
  category?: PostCategory;

  @Field(() => PostsFilter, { nullable: true })
  filter?: PostsFilter;

  @Field(() => PostsSort, { nullable: true })
  sort?: PostsSort;
}
