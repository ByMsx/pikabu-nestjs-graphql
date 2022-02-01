import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesRepository } from './likes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LikesRepository])],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
