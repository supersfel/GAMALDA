// 정보가 get되는지 확인되면 BE작업을 하자
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    PrismaService,
    AuthService
  ]
})

export class UserModule {};