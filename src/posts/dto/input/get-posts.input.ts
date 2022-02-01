import { Field, InputType, registerEnumType } from '@nestjs/graphql';

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
}

@InputType()
export class GetPostsInput {
  @Field(() => PostsFilter, { nullable: true })
  filter?: PostsFilter;

  @Field(() => PostsSort, { nullable: true })
  sort?: PostsSort;
}
