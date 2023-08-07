import { Injectable } from '@nestjs/common';
import { DBConnectionService } from 'src/db_connection/db_connection.service';
import { AuthService } from 'src/login/auth/auth.service';

@Injectable()
export class AccountManageService {
  constructor(
    private readonly dbConnectService: DBConnectionService,
    private readonly authService: AuthService,
  ) {}

  async updateUserInfo(userName: string, accessToken: string) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const result = await this.dbConnectService.updateUserInfo(userId, userName);
    return result;
  }
}
