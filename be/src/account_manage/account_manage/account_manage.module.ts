import { Module } from '@nestjs/common';
import { AccountManageController } from './account_manage.controller';
import { AccountManageService } from './account_manage.service';
import { DBConnectionService } from 'src/db_connection/db_connection.service';
import { AuthService } from 'src/login/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/login/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AccountManageController],
  providers: [
    AccountManageService,
    DBConnectionService,
    AuthService,
    JwtService
  ]
})
export class AccountManageModule {}
