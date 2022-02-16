import {
  EntityRepository,
  Like,
  ObjectLiteral,
  OrderByCondition,
  Repository,
} from 'typeorm';
import { Post } from './models/post.entity';
import { Like as LikeEntity } from '../likes/models/like.entity';
import { Comment } from '../comments/models/comment.entity';

export class PageInfo {
  limit: number;
  skip: number;
}

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  findPosts(
    where?: ObjectLiteral,
    order?: OrderByCondition,
    pagination?: PageInfo,
  ): Promise<Post[]> {
    let q = this.getQueryWithLikesAndCommentsCount();

    if (order) {
      q = q.orderBy(order);
    }

    if (where) {
      if (where._like) {
        Object.keys(where._like).forEach((key) => {
          where[key] = Like(where._like[key]);
        });
      }

      delete where._like;
      q = q.where(where);
    }

    if (pagination) {
      q = q.offset(pagination.skip).limit(pagination.limit);
    }

    return q.getRawMany<Post>();
  }

  postsCount(where?: ObjectLiteral): Promise<number> {
    let q = this.getQueryWithLikesAndCommentsCount();

    if (where) {
      q = q.where(where);
    }

    return q.getCount();
  }

  private getQueryWithLikesAndCommentsCount() {
    return this.createQueryBuilder('posts')
      .select('posts.*')
      .addSelect('posts.createdAt AS createdAt')
      .addSelect('COUNT(likes.id) AS likesCount')
      .addSelect('COUNT(dislikes.id) AS dislikesCount')
      .addSelect('COUNT(comments.id) AS commentsCount')
      .leftJoin(
        LikeEntity,
        'likes',
        'likes.postId = posts.id AND likes.rating > 0',
      )
      .leftJoin(
        LikeEntity,
        'dislikes',
        'likes.postId = posts.id AND likes.rating < 0',
      )
      .leftJoin(Comment, 'comments', 'comments.postId = posts.id')
      .groupBy('posts.id');
  }
}
