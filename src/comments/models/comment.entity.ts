import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/models/post.entity';
import { Markdown, UUID } from '../../common/types';
import { User } from '../../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'text' })
  text: Markdown;

  @ManyToOne(() => Post, (post) => post.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  post?: Post;

  @Column()
  postId: string;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  author: User;

  @Column()
  authorId: UUID;
}
