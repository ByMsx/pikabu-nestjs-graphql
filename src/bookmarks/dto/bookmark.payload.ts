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
  @Field(() => CommentPayload)
  comment: CommentPayload;

  @Field(() => UUIDConstructor)
  commentId: UUID;
}

@ObjectType()
export class PostBookmarkPayload extends BookmarkBase {
  @Field(() => PostPayload)
  post: PostPayload;

  @Field(() => UUIDConstructor)
  postId: UUID;
}

export const BookmarkPayload = createUnionType({
  name: 'BookmarkPayload',
  types: () => [PostBookmarkPayload, CommentBookmarkPayload],
});
