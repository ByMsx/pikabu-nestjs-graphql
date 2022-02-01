import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthorsLoader } from './authors.loader';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [
    {
      provide: 'AuthorsLoader',
      useClass: AuthorsLoader,
    },
  ],
  exports: ['AuthorsLoader'],
})
export class CommonModule {}
