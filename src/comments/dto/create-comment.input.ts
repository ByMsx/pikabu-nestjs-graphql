import { Field, InputType } from '@nestjs/graphql';
import {
  Markdown,
  MarkdownConstructor,
  UUIDConstructor,
} from '../../common/types';

@InputType()
export class CreateCommentInput {
  @Field(() => UUIDConstructor)
  postId: string;

  @Field(() => MarkdownConstructor)
  text: Markdown;
}
