// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    private authService: AuthService,
  ) {
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
  ) {
    const email = profile._json.email;
    const nickname = profile._json.nickname;
    const profileImage = profile._json.profile_image;

    const user = 'test';
    if (user === null) {
      // console.log('유저가 없으므로 일회용 토큰 추가');
      // console.log(accessToken)
    } else {
      const access_token = await this.authService.createAccessToken(email);
      // const refresh_token = await this.authService.createRefreshToken();
      // console.log(refreshToken, '리프레시 토큰')
      return { 
        email: email,
        nickname: nickname,
        profileImage: profileImage,
        access_token: access_token,
        naverRefresh_token: refreshToken,
      }
    }
  }
}