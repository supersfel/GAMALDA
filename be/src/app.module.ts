import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './login/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // NestJS에서 환경변수를 사용하기 위한 장치, root를 기준에 있는 env파일 이용
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
