// 정보가 get되는지 확인되면 BE작업을 하자
import { Controller, Get, UseGuards, Res, Req, Header, Redirect, Logger, Post } from '@nestjs/common';
import { Response} from 'express';
import { AuthService } from './auth.service';
import { NaverAuthGaurd } from './guard/naver-auth.guard';
import fetch from 'node-fetch'
// 네이버 로그인, 네이버 로그인을 하는 API
@Controller('/naver_login')
export class AuthController {
  constructor(
    private readonly authService: AuthService) { }
// 네이버 로그인 콜백, 네이버 로그인시 콜백 라우터이다.
  @Get('/callback') // /naver_login/callback
  @UseGuards(NaverAuthGaurd)
  async naverLoginCallback(@Req() req, @Res() res: Response) {
    if (req.user) {
      res.cookie('access_token', req.user.access_token);
      // console.log(req.user);
      // console.log(req.user.refresh_token, 'refresh_token');
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      if (req.user.type === 'login') {
        // console.log(req.user, 'auth controller')
        await this.authService.test(req.user)
        // test(req.user)
        
        // return (
        //   req.user
        // );
      }
      return res.json({ message: '인증 실패' });
    }
    // console.log(req.user)
    // return req.user
  }
}