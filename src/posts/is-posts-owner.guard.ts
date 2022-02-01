import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsPostsOwnerGuard implements CanActivate {
  constructor(
    private readonly repo: PostsRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const path = this.reflector.get('postIdPath', context.getHandler());

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    let postIds: string | string[] = IsPostsOwnerGuard.getPathInObj(
      ctx.getArgs(),
      path.split('.'),
    );
    if (!Array.isArray(postIds)) {
      postIds = [postIds];
    }

    const posts = await this.repo.findByIds(postIds);
    return posts.filter((post) => post.authorId !== user.id).length === 0;
  }

  private static getPathInObj(obj: any, fields: string[]): any {
    const v = obj[fields.shift()];
    if (fields.length <= 0) {
      return v;
    }

    return this.getPathInObj(v, fields);
  }
}
