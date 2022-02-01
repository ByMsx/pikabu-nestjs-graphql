import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtSettings } from '../common/constants';
import { GqlLocalGuard } from './guards/gql-local.guard';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtSettings.secret,
      signOptions: { expiresIn: '10000m' },
    }),
  ],
  providers: [
    AuthResolver,
    JwtStrategy,
    LocalStrategy,
    AuthService,
    GqlAuthGuard,
    GqlLocalGuard,
  ],
})
export class AuthModule {}
