import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from '../common/types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ length: 16 })
  nickname: string;

  @Column({ length: 32 })
  email: string;

  @Column({ length: 32 })
  passwordHash: string;
}
