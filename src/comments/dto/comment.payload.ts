import { Field, ObjectType } from '@nestjs/graphql';
import { UUID, UUIDConstructor } from '../../common/types';
import { PostPayload } from '../../posts/dto/output/post.payload';

@ObjectType()
export class CommentPayload {
  @Field(() => UUIDConstructor)
  id: UUID;

  @Field(() => String)
  text: string;

  @Field(() => PostPayload, { nullable: true })
  post?: PostPayload;

  @Field(() => Number)
  likesCount?: number;

  @Field(() => Number)
  dislikesCount?: number;

  postId: UUID; // TODO: may be move out here
  authorId: UUID;
}
