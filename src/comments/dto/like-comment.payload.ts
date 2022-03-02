import { MutationPayload } from '../../common/dto/mutation.payload';
import { CommentPayload } from './comment.payload';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: [MutationPayload],
})
export class LikeCommentPayload extends MutationPayload<CommentPayload> {
  @Field(() => CommentPayload, { nullable: true })
  record?: CommentPayload;
}
