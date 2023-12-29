// 정보가 get되는지 확인되면 BE작업을 하자
import { Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { NaverAuthGaurd } from '../auth/guard/naver-auth.guard';
import { UsersService } from './user.service';

// 네이버 로그인, 네이버 로그인을 하는 API
@Controller('')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

// 네이버 로그인 콜백, 네이버 로그인시 콜백 라우터이다.
  @Get('/naver-login/callback')
  @UseGuards(NaverAuthGaurd)
  async naverLoginCallback(@Req() req, @Res() res: Response) {
    if (req.user) {
      const loginResult = await this.userService.login(req.user);
      return loginResult ? await this.userService.workSuccess(loginResult, res) : await this.userService.workFailure(res);
    }
    else {
      return await this.userService.workFailure(res);
    }
  }

  @Get('/naver-login/logout')
  async userLogout(@Res() res: Response) {
    res.clearCookie('accessToken', { httpOnly: true });
    res.send({ state: 'cookieDeleted' });
  }

  @Post('/userverify')
  async verifyUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.verify(req.body.accessToken, res);
  }
}