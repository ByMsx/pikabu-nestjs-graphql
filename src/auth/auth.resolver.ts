import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignInPayload } from './dto/sign-in.payload';
import { SignInInput } from './dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlLocalGuard } from './guards/gql-local.guard';
import { SignUpPayload } from './dto/sign-up.payload';
import { SignUpInput } from './dto/sign-up.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(GqlLocalGuard)
  @Query(() => SignInPayload)
  signIn(@Args('data') data: SignInInput): Promise<SignInPayload> {
    return this.auth.signIn(data);
  }

  @Mutation(() => SignUpPayload)
  signUp(@Args('data') data: SignUpInput): Promise<SignUpPayload> {
    return this.auth.signUp(data);
  }
}
