import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Markdown,
  MarkdownConstructor,
  UUID,
  UUIDConstructor,
} from '../../../common/types';
import { CommentPayload } from '../../../comments/dto/comment.payload';
import { UserPayload } from '../../../auth/dto/user.payload';

@ObjectType()
export class PostPayload {
  @Field(() => UUIDConstructor)
  id: UUID;

  @Field(() => String)
  title: string;

  @Field(() => MarkdownConstructor)
  text: Markdown;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  imagesHrefs: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  likesCount?: number;

  @Field(() => Int)
  dislikesCount?: number;

  @Field(() => [CommentPayload])
  comments?: CommentPayload[];

  @Field(() => UserPayload)
  author?: UserPayload;

  @Field(() => UUIDConstructor)
  authorId: UUID;
}
