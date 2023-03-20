// BD에서 (로그인하는)유저의 정보가 있는지 여부를 판단하는 api(각각 email과 id를 이용)
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }
  
  /**
   * 
   * @param email 
   * @returns DB에서 유저 데이터의 존재 여부(boolean)
   */
  async findUser(email: string) {
    const isUserExist = await this.prismaService.findUserByEmail(email);
    return isUserExist ? true : false;
  }

  /**
   * 
   * @param userData 
   * @returns DB에 유저 데이터가 만들어졌는지 확인(boolean)
   */
  async createUser(userData: JSON) {
    const test = this.prismaService.createUserDate(userData)
    return (
      test ? console.log('유저가 만들어짐') : console.log('유저가 안만들어졌다')
    ) 
  }
}