import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Comment } from '../../comments/models/comment.entity';
import { Post } from '../../posts/models/post.entity';
import { UUID } from '../../common/types';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Comment, (comment) => comment.id)
  @JoinColumn()
  comment?: Comment;

  @Column({ nullable: true, type: 'uuid' })
  commentId: Comment['id'];

  @ManyToOne(() => Post, (post) => post.id)
  @JoinColumn()
  post?: Post;

  @Column({ nullable: true, type: 'uuid' })
  postId: Post['id'];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user?: User;

  @Column({ type: 'uuid', nullable: false })
  userId: User['id'];
}
