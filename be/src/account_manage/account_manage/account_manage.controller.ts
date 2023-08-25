import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { AccountManageService } from './account_manage.service';

@Controller('account_manage')
export class AccountManageController {
  constructor(private readonly accountManageService: AccountManageService) { }
  
  @Patch('/username')
  async updateUserName(
    @Body('accessToken') accessToken: string,
    @Body('userName') userName: string
  ) {
    const ret = await this.accountManageService.updateUserName(userName, accessToken);
    return ret;
  }

  @Patch('/userimage')
  async updateUserImage(
    @Body('accessToken') accessToken: string,
    @Body('userImgUrl') userImgUrl: string,
    
  ) {
    const ret = await this.accountManageService.updateUserImg(userImgUrl, accessToken);
    return ret;
  }
}
