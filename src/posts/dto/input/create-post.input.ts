import { Field, InputType } from '@nestjs/graphql';
import { Markdown, MarkdownConstructor } from '../../../common/types';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => MarkdownConstructor)
  text: Markdown;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  imagesHrefs: string[];
}
