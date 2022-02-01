import { Args, Query, Resolver } from '@nestjs/graphql';
import { SignInPayload } from './dto/sign-in.payload';
import { SignInInput } from './dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlLocalGuard } from './guards/gql-local.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(GqlLocalGuard)
  @Query(() => SignInPayload)
  signIn(@Args('data') data: SignInInput): Promise<SignInPayload> {
    return this.auth.signIn(data);
  }
}
