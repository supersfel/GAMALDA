// 정보가 get되는지 확인되면 BE작업을 하자

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NaverStrategy } from '../strategy/naver.strategy';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
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