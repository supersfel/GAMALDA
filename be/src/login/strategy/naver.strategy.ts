import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
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
    profile: any
  ): Promise<any> {
    console.log("프로필",profile)
    const user_email = profile._json.email;
    const user_nick = profile._json.nickname;
    const user_provider = profile.provider;
    const user_profile = {
      user_email,
      user_nick,
      user_provider,
    };
    
    // const user = await this.authService.validateUser(user_email);
    // if (user === null) {
    //   return fail;
    // }

    // return done(null, user);
  }
}