import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Markdown, UUID } from '../../common/types';
import { Like } from '../../likes/models/like.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ length: 128 })
  title: string;

  @Column({ type: 'text' })
  text: Markdown;

  @Column({ array: true, type: 'varchar', length: 32 })
  tags: string[];

  @Column({ array: true, type: 'varchar', length: 256 })
  imagesHrefs: string[];

  @Column({ type: 'timestamptz', nullable: true })
  createdAt: Date;

  @OneToMany(() => Like, (like) => like.postId)
  likes?: Like[];

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  author?: User;

  @Column()
  authorId: UUID;
}
