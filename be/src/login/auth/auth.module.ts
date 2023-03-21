// 정보가 get되는지 확인되면 BE작업을 하자
import { forwardRef, Module } from '@nestjs/common';
import { NaverStrategy } from './strategy/naver.strategy';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule
  ],
  providers: [
    AuthService,
    NaverStrategy,
  ]
})

export class AuthModule {};