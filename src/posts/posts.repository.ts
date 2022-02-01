import {
  EntityRepository,
  ObjectLiteral,
  OrderByCondition,
  Repository,
} from 'typeorm';
import { Post } from './models/post.entity';
import { Like } from '../likes/models/like.entity';
import { Comment } from '../comments/models/comment.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  findPosts(where?: ObjectLiteral, order?: OrderByCondition): Promise<Post[]> {
    let q = this.getQueryWithLikesAndCommentsCount();

    if (order) {
      q = q.orderBy(order);
    }

    if (where) {
      q.where(where);
    }

    return q.getRawMany<Post>();
  }

  private getQueryWithLikesAndCommentsCount() {
    return this.createQueryBuilder('posts')
      .select('posts.*')
      .addSelect('posts.createdAt AS createdAt')
      .addSelect('COUNT(likes.id) AS likesCount')
      .addSelect('COUNT(dislikes.id) AS dislikesCount')
      .addSelect('COUNT(comments.id) AS commentsCount')
      .leftJoin(Like, 'likes', 'likes.postId = posts.id AND likes.rating > 0')
      .leftJoin(
        Like,
        'dislikes',
        'likes.postId = posts.id AND likes.rating < 0',
      )
      .leftJoin(Comment, 'comments', 'comments.postId = posts.id')
      .groupBy('posts.id');
  }
}
