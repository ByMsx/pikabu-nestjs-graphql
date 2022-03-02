import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { SignInInput } from './dto/sign-in.input';
import { SignInPayload } from './dto/sign-in.payload';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserPayload } from './dto/user.payload';
import { SignUpPayload } from './dto/sign-up.payload';
import { SignUpInput } from './dto/sign-up.input';
import { MutationError, MutationStatus } from '../common/dto/mutation.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.users.findByEmailAndPassword(email, password);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async signIn(data: SignInInput): Promise<SignInPayload> {
    const userInstance = await this.validateByEmailAndPassword(
      data.email,
      data.password,
    );

    const user = plainToInstance(UserPayload, userInstance);
    const token = this.jwt.sign(instanceToPlain(user));

    return {
      token,
      user,
    };
  }

  async signUp(data: SignUpInput): Promise<SignUpPayload> {
    try {
      const userInstance = await this.users.createOne(data);
      return {
        record: userInstance,
        recordID: userInstance.id,
        status: MutationStatus.SUCCESS,
      };
    } catch (e) {
      return {
        error: new MutationError(e),
        status: MutationStatus.FAIL,
      };
    }
  }
}
