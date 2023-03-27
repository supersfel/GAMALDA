// 정보가 get되는지 확인되면 BE작업을 하자
import { Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
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
  @Get('')
  @UseGuards(NaverAuthGaurd)
  login() { }

// 네이버 로그인 콜백, 네이버 로그인시 콜백 라우터이다.
  @Get('/callback') // /naver_login/callback
  @UseGuards(NaverAuthGaurd)
  async naverLoginCallback(@Req() req, @Res() res: Response) {
    console.log(req.user, 'userController')
    // res.send(req.user)
    if (req.user) {
      const existUser = await this.userService.findUser(req.user.email)
      if (!existUser) {
        const access_token = await this.authService.createAccessToken(req.user.email);
        const isCreatedUserData = await this.userService.createUser(req.user, access_token);
        if (isCreatedUserData) {
          const accessToken = await this.userService.getAccessToken(req.user.email);
          console.log('accessToken', accessToken);
          res.cookie('accessToken', accessToken);
        } else {
          console.log('유저 생성 실패');
          return;
        }
      } else {
        console.log('유저 이미 있음');
        const accessToken = await this.userService.getAccessToken(req.user.email);
        console.log('accessToken', accessToken);
        res.cookie('accessToken', accessToken);
        return res.redirect("http://localhost:3000");
        // return res.json({ test: 'test' });
      }
    } else {
      return res.json({ message: '인증 실패' });
    }
  }

  // @Get('/success')
  // async test(@Res() res: Response) {
  //   console.log('되길 빈다... success')
  //   res.send({ test: 'test0000' });
  //   return {
  //     test: 'test0000'
  //   }
  // }
}