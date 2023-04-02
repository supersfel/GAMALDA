// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_LOGIN_CALLBACK_URL
    });
  }

  async validate(
    accessToken: string,  // 지워주면 데이터 못얻어옴
    refreshToken: string, // 지워주면 데이터 못얻어옴
    profile: any,
  ) {
    const email = profile._json.email;
    const nickname = profile._json.nickname;
    const profileImage = profile._json.profile_image;

    return { 
        email: email,
        nickname: nickname,
        profileImage: profileImage,
        naverRefresh_token: refreshToken,
      };
  }
}