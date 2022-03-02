import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Markdown,
  MarkdownConstructor,
  UUID,
  UUIDConstructor,
} from '../../common/types';
import { PostPayload } from '../../posts/dto/output/post.payload';

@ObjectType()
export class CommentPayload {
  @Field(() => UUIDConstructor)
  id: UUID;

  @Field(() => MarkdownConstructor)
  text: Markdown;

  @Field(() => PostPayload)
  post: PostPayload;

  @Field(() => Int)
  likesCount?: number;

  @Field(() => Int)
  dislikesCount?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => UUIDConstructor)
  postId: UUID;

  @Field(() => UUIDConstructor)
  authorId: UUID;
}
