// BD에서 (로그인하는)유저의 정보가 있는지 여부를 판단하는 api(각각 email과 id를 이용)

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  // private users: any[] = [];

  // async create(user: any): Promise<any> {
  //   const newUser = {
  //     id: this.users.length + 1,
  //     email: user.email,
  //     name: user.name,
  //     provider: user.provider,
  //     providerId: user.providerId,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  // async findByEmail(email: string): Promise<any> {
  //   return this.users.find((user) => user.email === email);
  // }
}