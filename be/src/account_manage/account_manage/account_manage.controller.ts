import { Body, Controller, Post } from '@nestjs/common';
import { AccountManageService } from './account_manage.service';

@Controller('account_manage')
export class AccountManageController {
  constructor(private readonly accountManageService: AccountManageService) { }
  @Post('/update_changes')
  async updateChanges(
    @Body('accessToken') accessToken: string,
    @Body('userName') userName: string
  ) {
    const ret = await this.accountManageService.updateUserInfo(userName, accessToken);
    return ret;
  }
}
