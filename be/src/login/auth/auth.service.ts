// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  
  constructor(private readonly jwtService: JwtService
  ) { }
  /**
   * 
   * @param user 
   * @returns 유저 email을 기반으로 한 JWT 토큰
   * 가말대 내부에서 사용할 accessToken을 email을 이용해 생성
   */
  async createAccessToken(email: string) {
    const payload = {
      email: email,
    };
    return this.jwtService.sign(payload);
  }

  // async createRefreshToken(user?: any) {
  //   const payload = {
  //     // user_no: user.user_no,
  //     token_type: 'refreshToken'
  //   };
  //   const token = this.jwtService.sign(payload);
  //   // const refresh_token = CryptoJS.AES.encrypt(
  //   //   JSON.stringify(token),
  //   //   'testpassword',
  //   // ).toString();
  //   // return refresh_token
  // }

  // async test(data: any) {
  //   console.log(data, 'auth service test')
  // }

  // 토큰 검증 API(미완)
  async verifyToken(token: any) {
    const isSameToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(isSameToken);
    return;
  }
}