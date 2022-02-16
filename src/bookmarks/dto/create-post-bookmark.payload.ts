import { MutationPayload } from '../../common/dto/mutation.payload';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostBookmarkPayload } from './bookmark.payload';

@ObjectType({
  implements: [MutationPayload],
})
export class CreatePostBookmarkPayload extends MutationPayload<PostBookmarkPayload> {
  @Field(() => PostBookmarkPayload, { nullable: true })
  record?: PostBookmarkPayload;
}
