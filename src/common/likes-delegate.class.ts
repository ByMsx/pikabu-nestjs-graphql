import { LikesRepository } from '../likes/likes.repository';
import { Repository } from 'typeorm';
import { UUID } from './types';
import {
  MutationError,
  MutationPayload,
  MutationStatus,
} from './dto/mutation.payload';
import { plainToInstance } from 'class-transformer';

export class LikesDelegate<
  T extends { id: UUID },
  P,
  D extends MutationPayload<P>,
> {
  constructor(
    private likes: LikesRepository,
    private repo: Repository<T>,
    private payloadConstructor: new () => P,
  ) {}

  async like(entityId: UUID, userId: UUID): Promise<D> {
    return this.createLike(entityId, userId, 1);
  }

  async dislike(entityId: UUID, userId: UUID): Promise<D> {
    return this.createLike(entityId, userId, -1);
  }

  async createLike(entityId: UUID, userId: UUID, rating: number): Promise<D> {
    try {
      const instance = await this.repo.findOne(entityId);
      // TODO: should I check entity existence
      await this.likes.createLike('comment', entityId, userId, rating);
      const record = plainToInstance(this.payloadConstructor, instance);

      return {
        record,
        recordID: instance.id,
        status: MutationStatus.SUCCESS,
      } as D;
    } catch (e) {
      return {
        status: MutationStatus.FAIL,
        error: new MutationError(e.message),
      } as D; // тут мне понадобился `as`, потому что TypeScript отказывался воспринимать тип, наследующийся
      // от абстрактного класса, говоря, что нельзя создать абстрактный класс
    }
  }
}
