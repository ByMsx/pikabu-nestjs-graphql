import { EntityRepository, OrderByCondition, Repository } from 'typeorm';
import { Comment } from './models/comment.entity';
import { UUID } from '../common/types';
import { CommentPayload } from './dto/comment.payload';
import { PageInfo } from '../posts/posts.repository';
import { Like as LikeEntity } from '../likes/models/like.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async getPostsComments(
    postsIds: UUID[],
  ): Promise<{ postId: UUID; comments: CommentPayload[] }[]> {
    const comments = await this.createQueryBuilder()
      .select()
      .where('Comment.postId IN (:...postsIds)', { postsIds })
      .getMany();

    const result: Record<UUID, CommentPayload[]> = {};
    postsIds.forEach((id) => (result[id] ??= []));

    comments.forEach((comment) => {
      result[comment.postId].push(comment);
    });

    return Object.keys(result).map((key) => ({
      postId: key,
      comments: result[key],
    }));
  }

  async countPostComments(postId: UUID): Promise<number> {
    return this.getQueryWithLikesAndDislikesForPost(postId).getCount();
  }

  async getPostComments(
    postId: UUID,
    order?: OrderByCondition,
    pagination?: PageInfo,
  ): Promise<Comment[]> {
    let q = this.getQueryWithLikesAndDislikesForPost(postId);

    if (order) {
      q = q.orderBy(order);
    }

    if (pagination) {
      q.offset(pagination.skip).limit(pagination.limit);
    }

    return q.getRawMany<Comment>();
  }

  private getQueryWithLikesAndDislikesForPost(postId: UUID) {
    return this.getQueryWithLikesAndDislikes().where(
      'comments.postId = :postId',
      { postId },
    );
  }

  private getQueryWithLikesAndDislikes() {
    return this.createQueryBuilder('comments')
      .select('comments.*')
      .addSelect('comments.createdAt AS createdAt')
      .addSelect('COUNT(likes.id) AS likesCount')
      .addSelect('COUNT(dislikes.id) AS dislikesCount')
      .leftJoin(
        LikeEntity,
        'likes',
        'likes.commentId = comments.id AND likes.rating > 0',
      )
      .leftJoin(
        LikeEntity,
        'dislikes',
        'dislikes.commentId = comments.id AND dislikes.rating < 0',
      )
      .groupBy('comments.id');
  }
}
