// 정보가 get되는지 확인되면 BE작업을 하자
import { Controller, Get, UseGuards, Res, Req, Post, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { NaverStrategy } from '../strategy/naver.strategy';

@Controller('naver_login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // constructor() { }
  // @Get('naver_login')
  // @UseGuards(AuthGuard('naverStrategy'))
  // getBye(): string{
  //   return this.authService.getBye();
  //   }
    
  // async naverLogin() {
  //   console.log('네이버 로그인')
  //   // initiates the Naver OAuth2 login flow
  // }

  // @Get('/naver_login/callback')
  // @UseGuards(NaverStrategy)
  // // naverLoginCallback은 메서드를 작성해주고 service에서 있는 메서드를 불러와 사용하는 모양이다.
  // // 이름이 같지 않으면 실행 안됨
  // naverLoginCallback(@Req() req) {
  //   console.log('네이버 로그인 콜백 code', req.query.code);

  //   // console.log('네이버 로그인 콜백 state', req.query.state)
  //   // const user = req.user;
  //   // return this.authService.naverLoginCallback(user);

  //   // handles the naver OAuth2 callback
  // //   const jwt: string = req.user.jwt;
  // //   if (jwt)
  // //     res.redirect('http://localhost:4200/naverLoginCallback/succes/' + jwt);
  // //   else
  // //     res.redirect('http://localhost:4200/naverLoginCallback/failure');
  // }

  @Post('loading')
  @UseGuards(NaverStrategy)
  test(@Req() req) {
    return this.authService.test(req.body)
  }
}