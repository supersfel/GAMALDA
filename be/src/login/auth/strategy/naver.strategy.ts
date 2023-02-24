// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { UsersService } from 'src/login/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  // constructor(private authService: AuthService) {
  constructor(
    private authService: AuthService,
    private userService: UsersService
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

    const userEmail = profile._json.email;
    const nickname = profile._json.nickname;
    const profileImage = profile._json.profile_image;
    const userInfo = {
      'email': userEmail,
      'nickname': nickname,
      'profileImage': profileImage
    };

    // 유저의 존재여부를 확인하는 authService의 api이용
    // const user = await this.userService.findByEmail(user_email);
    const user = 'test';
    if (user === null) {
      console.log('유저가 없으므로 일회용 토큰 추가');
    } else {
      console.log('유저가 있으므로 로그인 토큰 발급하기');
      console.log(accessToken, '원래 accessToken')
      const access_token = await this.authService.createLoginToken();
      const refresh_token = await this.authService.createRefreshToken();

      return { access_token, refresh_token, type: 'login' }
    }
  }
}