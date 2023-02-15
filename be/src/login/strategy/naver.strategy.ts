// 정보가 get되는지 확인되면 BE작업을 하자

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';


@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naverStrategy') {
  // constructor(private authService: AuthService) {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_LOGIN_CALLBACK_URL
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) {
    const { id, displayName, emails } = profile._json;
    const user = {
      id,
      name: displayName,
      email: emails[0].value,
      accessToken,
      refreshToken
    };
    return done(null, user);
  }
}