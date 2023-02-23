// 정보가 get되는지 확인되면 BE작업을 하자

import { Injectable, Req } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';

@Injectable()
export class AuthService {
  
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async createLoginToken(user?:any) {
    const payload = {
      // user_no: user.user_no,
      token_type: 'loginToken'
    };
    // console.log('로그인 토큰 생성');
    // return '로그인 토큰 생성'
    return this.jwtService.sign(payload);
  }

  // async test2(code: any) {
  //   console.log(code, 'be에 전달된 네이버 코드, 상태');
  // }
  
  // // 네이버 로그인 서버에 유저 정보 접근 요청
  // async test1(code: string, state: string) {
  //   console.log(code, state, 'be에 전달된 네이버 코드, 상태');
  //   state === process.env.NAVER_STATE ?
  //     (
  //       console.log('state같음')

  //     ) :
  //     (
  //       console.log('state다름')
  //     )
  // }


}