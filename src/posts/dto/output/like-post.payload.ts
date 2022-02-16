import { Field, ObjectType } from '@nestjs/graphql';
import { MutationPayload } from '../../../common/dto/mutation.payload';
import { PostPayload } from './post.payload';

@ObjectType({
  implements: [MutationPayload],
})
export class LikePostPayload extends MutationPayload<PostPayload> {
  @Field(() => PostPayload, { nullable: true })
  record?: PostPayload;
}
