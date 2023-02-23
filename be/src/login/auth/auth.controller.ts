// 정보가 get되는지 확인되면 BE작업을 하자
import { Controller, Get, UseGuards, Res, Req, Post, Param, Query, Body, Redirect } from '@nestjs/common';
import { Request, Response} from 'express';
import { AuthService } from './auth.service';
import { NaverAuthGaurd } from './guard/naver-auth.guard';

// 네이버 로그인, 네이버 로그인을 하는 API
@Controller('/naver_login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// 네이버 로그인 콜백, 네이버 로그인시 콜백 라우터이다.
  @UseGuards(NaverAuthGaurd)
  @Get('/callback')
  async callback(
    @Req() req,
    @Res() res : Response,
  ): Promise<any> {
    console.log(req.user);
    if (req.user) {
      // res.cookie('access_token', req.user.access_token)
      console.log(req.user.access_token, 'accesstoken')
    }
    res.redirect('http://localhost:3000');
    res.end();
  }
}