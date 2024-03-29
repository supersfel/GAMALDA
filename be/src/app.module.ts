import { Module, MiddlewareConsumer, NestModule, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './login/auth/auth.module';
import { UserModule } from './login/user/user.module';
import { SocketModule } from './socket/socket.module';
import { BlockModule } from './block/block.module';
import { ProjectModule } from './project/project.module';
import { AccountManageModule } from './account_manage/account_manage/account_manage.module';

@Module({
  controllers: [AppController],
  providers: [AppService, Logger],
  imports: [
    SocketModule,
    ConfigModule.forRoot({ isGlobal: true }), // NestJS에서 환경변수를 사용하기 위한 장치, root를 기준에 있는 env파일 이용
    UserModule,
    AuthModule,
    BlockModule,
    ProjectModule,
    AccountManageModule
  ],
})
export class AppModule {}
