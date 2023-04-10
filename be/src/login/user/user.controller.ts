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
  @Get('/naver_login/callback')
  @UseGuards(NaverAuthGaurd)
  async naverLoginCallback(@Req() req, @Res() res: Response) {
    if (req.user) {
      const existUser = await this.userService.findUser(req.user.email);
      if (!existUser) {
        const access_token = await this.authService.createAccessToken(req.user.email);
        const isCreatedUserData = await this.userService.createUser(req.user, access_token);
        if (isCreatedUserData) {
          const accessToken = await this.userService.getAccessToken(req.user.email);
          res.cookie('accessToken', accessToken);
          return res.redirect(process.env.MAIN_PAGE_URL);
        } else {
            res.write(`<script>alert('There is some Error... Please try again...')</script>`);
            res.write(`<script>window.location="${process.env.MAIN_PAGE_URL}"</script>`);
        }
      } else {
        const accessToken = await this.authService.createAccessToken(req.user.email);
        const isUpdated = await this.userService.updateAccessToken(req.user.email, accessToken);
        if (isUpdated) {
          res.cookie('accessToken', accessToken);
          return res.redirect(process.env.MAIN_PAGE_URL);
        }
        else {
          res.write(`<script>alert('There is some Error... Please try again...')</script>`);
          res.write(`<script>window.location="${process.env.MAIN_PAGE_URL}"</script>`);
        }
        
      }
    } else {
      res.write(`<script>alert('There is some Error... Please try again...')</script>`);
      res.write(`<script>window.location="${process.env.MAIN_PAGE_URL}"</script>`);
    }
  }

  @Get('/naver_login/logout')
  async userLogout(@Res() res: Response) {
    res.clearCookie('accessToken', { httpOnly: true });
    res.send('cookieDeleted');
  }

  @Post('/userverify')
  async verifyUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.body.accessToken)
    const userVerify = await this.authService.verifyToken(req.body.accessToken)
    console.log(userVerify)
  }
}