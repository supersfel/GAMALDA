// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken'
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly jwtService: JwtService,
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
   * @returns userEmail: string, 에러발생, 토큰이 없는 경우 false: boolean
   */
  async verifyToken(token?: string) {
    if (token) {
      try {
        const isSameToken: jwt.JwtPayload | any = jwt.verify(token, process.env.JWT_SECRET);
        return isSameToken.email;
      }
      catch (e) {
        console.log(e, 'verifyError');
        return false;
      }
    }
    else {
      return false;
    }
  }
}