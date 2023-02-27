// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js'

@Injectable()
export class AuthService {
  
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }
  // 인자의 ? 와 any는 추후 수정
  async createLoginToken(user?: any) {
    const payload = {
      // user_no: user.user_no,
      token_type: 'loginToken'
    };
    return this.jwtService.sign(payload);
  }

  async createRefreshToken(user?: any) {
    const payload = {
      // user_no: user.user_no,
      token_type: 'refreshToken'
    };
    const token = this.jwtService.sign(payload);
    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      'testpassword',
    ).toString();
    //여기에 DB에 refreshToken을 넣어주는 함수를 작성하자.
    // await getConnection()
    //   .createQueryBuilder()
    //   .update(User)
    //   .set({ user_refresh_token: token })
    //   .where(`user_no = ${user.user_no}`)
    //   .execute();

    return refresh_token
  }
}