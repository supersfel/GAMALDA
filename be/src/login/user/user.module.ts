// 정보가 get되는지 확인되면 BE작업을 하자
import { Module } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    PassportModule,
    // .env작업은 비동기적으로 읽어오기에 registerAsync메서드를 사용해줘야한다.
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  // controllers: [AuthController],
  // providers: [
  //   AuthService,
  //   NaverStrategy,
  //   UsersService
  // ]
})

export class AuthModule {};