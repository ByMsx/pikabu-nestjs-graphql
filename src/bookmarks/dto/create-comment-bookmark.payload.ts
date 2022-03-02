import { Field, ObjectType } from '@nestjs/graphql';
import { MutationPayload } from '../../common/dto/mutation.payload';
import { CommentBookmarkPayload } from './bookmark.payload';

@ObjectType({
  implements: [MutationPayload],
})
export class CreateCommentBookmarkPayload extends MutationPayload<CommentBookmarkPayload> {
  @Field(() => CommentBookmarkPayload, { nullable: true })
  record?: CommentBookmarkPayload;
}
