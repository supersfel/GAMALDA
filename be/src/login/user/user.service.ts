// 정보가 get되는지 확인되면 BE작업을 하자

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any[] = [];

  async create(user: any): Promise<any> {
    const newUser = {
      id: this.users.length + 1,
      email: user.email,
      name: user.name,
      provider: user.provider,
      providerId: user.providerId,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }
}