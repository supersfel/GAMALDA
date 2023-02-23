// 정보가 get되는지 확인되면 BE작업을 하자

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NaverStrategy } from './strategy/naver.strategy';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    PassportModule,
    // .env작업은 비동기적으로 읽어오기에 registerAsync메서드를 사용해줘야한다.
    JwtModule.register({
      secret: 'testscret',  // 이 부분을 수정해주자
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    NaverStrategy,
    UsersService
  ]
})

export class AuthModule {};