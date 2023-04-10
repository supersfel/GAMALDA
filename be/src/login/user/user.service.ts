// BD에서 (로그인하는)유저의 정보가 있는지 여부를 판단하는 api(각각 email과 id를 이용)
import { Injectable } from '@nestjs/common';
import { DBConnectionService } from 'src/db_connection/db_connection.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbConnectService: DBConnectionService
  ) { }
  
  /**
   * @param email 
   * @returns DB에서 유저 데이터의 존재 여부(boolean)
   * { id: num, email: string, nickname: string, profileImage: string, access_token: string, naverRefresh_token: string }
   */
  async findUser(email: string) {
    const isUserExist = await this.dbConnectService.findUserByEmail(email);
    return isUserExist ? true : false;
  }

  /**
   * 
   * @param userData 
   * @param accessToken 
   * @returns DB에 유저 데이터가 만들어졌는지 확인(boolean)
   */
  async createUser(userData: JSON, accessToken: string) {
    const DBuserData = await this.dbConnectService.createUserDate(userData, accessToken);
    return DBuserData ? true : false;
  }

  /**
   * @param email 
   * @returns 유저의 고유 accessToken
   */
  async getAccessToken(email: string) {
    const accessToken = await this.dbConnectService.getAccessToken(email);
    return accessToken ? accessToken : false;
  }

  /**
   * @param email 
   * @param token 
   * @returns 토큰 갱신이 되었는지 확인(boolean)
   */
  async updateAccessToken(email: string, token: string) {
    const updateAccessToken = await this.dbConnectService.updateAccessToken(email, token);
    if (updateAccessToken) {
      return true;
    }
    else {
      return false
    }
  }
}