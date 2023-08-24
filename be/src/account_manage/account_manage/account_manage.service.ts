import { Injectable } from '@nestjs/common';
import { DBConnectionService } from 'src/db_connection/db_connection.service';
import { AuthService } from 'src/login/auth/auth.service';

@Injectable()
export class AccountManageService {
  constructor(
    private readonly dbConnectService: DBConnectionService,
    private readonly authService: AuthService,
  ) {}

  /**
   * accessToken을 이용해 유저 인증후 유저명을 변경하는 함수
   * @param userName 
   * @param accessToken 
   * @returns 성공여부
   */
  async updateUserName(
    userName: string,
    accessToken: string
  ) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const result = await this.dbConnectService.updateUserName(userId, userName);
    return result;
  }

  /**
   * accessToken을 이용해 유저 인증후 유저 이미지를 변경하는 함수
   * @param userImg 
   * @param accessToken 
   * @returns 성공여부
   */
  async updateUserImg(
    userImg: string,
    accessToken: string
  ) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const result = await this.dbConnectService.updateUserImage(userId, userImg);
    return result;
  }
}
