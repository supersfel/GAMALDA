// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  
  constructor(
    private readonly jwtService: JwtService
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
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  /**
   * @param token 
   * @returns 유저email과 토큰 생성, 만료 시간을 객체 형식으로 반환
   * { email: 유저 email, iat: 토큰 생성시간, exp: 토큰 만료시간 }
   */
  async verifyToken(token: any) {
    const isSameToken = jwt.verify(token, process.env.JWT_SECRET)
    return isSameToken;
  }
}