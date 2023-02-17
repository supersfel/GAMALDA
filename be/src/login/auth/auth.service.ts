// 정보가 get되는지 확인되면 BE작업을 하자

import { Injectable, Req } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async test(code: string) {
    console.log(code, 'be');
  }

  async validateUser(user: any): Promise<any> {
    return await this.usersService.findByEmail(user.email);
  }

  async naverLoginCallback(user: any) {
    console.log('로그인 함수')
    const existingUser = await this.validateUser(user);
    if (existingUser) {
      const payload = { email: existingUser.email, sub: existingUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      const newUser = await this.usersService.create(user);
      const payload = { email: newUser.email, sub: newUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}