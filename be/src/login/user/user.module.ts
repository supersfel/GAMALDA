// 정보가 get되는지 확인되면 BE작업을 하자
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBConnectionService } from 'src/db_connection/db_connection.service';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), // env에서 JWT_SECRET 가져오기
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    AuthService,
    DBConnectionService
  ]
})

export class UserModule {};