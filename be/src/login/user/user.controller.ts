// 정보가 get되는지 확인되면 BE작업을 하자
import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { NaverAuthGaurd } from '../auth/guard/naver-auth.guard';
import { UsersService } from './user.service';

// 네이버 로그인, 네이버 로그인을 하는 API
@Controller('/naver_login')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }
// 네이버 로그인 콜백, 네이버 로그인시 콜백 라우터이다.
  @Get('/callback') // /naver_login/callback
  @UseGuards(NaverAuthGaurd)
  async naverLoginCallback(@Req() req, @Res() res: Response) {
    console.log(req.user, 'userService')
    if (req.user) {
      // 이건 나중에 로그인 되면 나오는 데이터에서 추출해 쿠키로 전달
      // res.cookie('access_token', req.user.access_token); 
      const existUser = await this.userService.findUser(req.user.email)
      if (!existUser) {
        // const access_token = await this.authService.createAccessToken(req.user.email);
        await this.userService.createUser(req.user);
      } else {
        console.log('유저 이미 있음')
      }
      return res.json({ message: '인증 실패' });
    }
  }
}