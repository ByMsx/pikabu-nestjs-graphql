import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => Comment, (comment) => comment.id)
  @JoinColumn()
  comment?: Comment;

  @Column({ nullable: true, type: 'uuid' })
  commentId: Comment['id'];

  @OneToMany(() => Post, (post) => post.id)
  @JoinColumn()
  post?: Post;

  @Column({ nullable: true, type: 'uuid' })
  postId: Post['id'];

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn()
  user?: User;

  @Column({ type: 'uuid', nullable: false })
  userId: User['id'];
}
