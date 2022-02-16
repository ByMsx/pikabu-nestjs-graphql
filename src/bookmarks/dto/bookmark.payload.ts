import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { CommentPayload } from '../../comments/dto/comment.payload';
import { UserPayload } from '../../auth/dto/user.payload';
import { PostPayload } from '../../posts/dto/output/post.payload';
import { UUID, UUIDConstructor } from '../../common/types';

export class BookmarkBase {
  @Field(() => UUIDConstructor)
  id: UUID;

  @Field(() => UserPayload, { nullable: false })
  user?: UserPayload;
}

@ObjectType()
export class CommentBookmarkPayload extends BookmarkBase {
  @Field(() => CommentPayload, { nullable: true })
  comment?: CommentPayload;

  @Field(() => UUIDConstructor, { nullable: true })
  commentId?: UUID;
}

@ObjectType()
export class PostBookmarkPayload extends BookmarkBase {
  @Field(() => PostPayload, { nullable: true })
  post?: PostPayload;

  @Field(() => UUIDConstructor, { nullable: true })
  postId?: UUID;
}

export const BookmarkPayload = createUnionType({
  name: 'BookmarkPayload',
  types: () => [PostBookmarkPayload, CommentBookmarkPayload],
});
