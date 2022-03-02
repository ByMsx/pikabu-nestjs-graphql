import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Post } from '../../posts/models/post.entity';
import { Comment } from '../../comments/models/comment.entity';
import { UUID } from '../../common/types';
import { User } from '../../users/user.entity';

@Entity()
@Unique(['postId', 'commentId', 'userId'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.id)
  @JoinColumn()
  post: Post;

  @Column({ nullable: true })
  postId: UUID;

  @ManyToOne(() => Comment, (comment) => comment.id)
  @JoinColumn()
  comment: Comment;

  @Column({ nullable: true })
  commentId: UUID;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user?: User;

  @Column()
  userId: UUID;

  @Column({ type: 'smallint', default: 1 })
  rating: number;
}
