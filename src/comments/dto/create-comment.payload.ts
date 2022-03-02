import { MutationPayload } from '../../common/dto/mutation.payload';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommentPayload } from './comment.payload';

@ObjectType({
  implements: [MutationPayload],
})
export class CreateCommentPayload extends MutationPayload<CommentPayload> {
  @Field(() => CommentPayload, { nullable: true })
  record?: CommentPayload;
}
