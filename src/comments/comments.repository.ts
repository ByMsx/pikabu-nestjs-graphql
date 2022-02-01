import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './models/comment.entity';
import { UUID } from '../common/types';
import { CommentPayload } from './dto/comment.payload';

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
}
