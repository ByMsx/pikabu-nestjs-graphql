import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field(() => String, {
    description: 'Your nickname for display on the website',
  })
  nickname: string;

  @Field(() => String, { description: 'Email like a john-doe@mail.com' })
  email: string;

  @Field(() => String)
  password: string;
}
