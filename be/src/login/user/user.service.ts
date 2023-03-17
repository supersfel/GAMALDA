// BD에서 (로그인하는)유저의 정보가 있는지 여부를 판단하는 api(각각 email과 id를 이용)
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  // async findByEmail(email: string) {
  //   const user = await 이제 db랑 연결해서 유저를 찾는 메서드 ㄱㄱ
  // }

  /**
   * 처음 로그인한 유저의 정보를 저장
   */
  async signInUser(userData: JSON) {
    
  }
}