import { Controller, Get, UseGuards, Res, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  @Get('naver_login')
  @UseGuards(AuthGuard('naver'))
  naverLogin() {
    console.log('네이버 로그인')
    // initiates the Naver OAuth2 login flow
  }

  @Get('naver_login/callback')
  @UseGuards(AuthGuard('naver'))
  naverLoginCallback( @Req() req ) {
    console.log('네이버 로그인 콜백', req.user)

    // handles the naver OAuth2 callback
  //   const jwt: string = req.user.jwt;
  //   if (jwt)
  //     res.redirect('http://localhost:4200/login/succes/' + jwt);
  //   else
  //     res.redirect('http://localhost:4200/login/failure');
  }
}