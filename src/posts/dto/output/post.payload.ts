import { Field, ObjectType } from '@nestjs/graphql';
import { UUID, UUIDConstructor } from '../../../common/types';
import { CommentPayload } from '../../../comments/dto/comment.payload';
import { UserPayload } from '../../../auth/dto/user.payload';

@ObjectType()
export class PostPayload {
  @Field(() => UUIDConstructor)
  id: UUID;

  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  imagesHrefs: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Number)
  likesCount?: number;

  @Field(() => Number)
  dislikesCount?: number;

  @Field(() => [CommentPayload])
  comments?: CommentPayload[];

  @Field(() => UserPayload)
  author?: UserPayload;

  @Field(() => UUIDConstructor)
  authorId: UUID;
}
