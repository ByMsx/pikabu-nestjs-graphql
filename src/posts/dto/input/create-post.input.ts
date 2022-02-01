import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  imagesHrefs: string[];
}
