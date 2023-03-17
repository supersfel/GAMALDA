// 정보가 get되는지 확인되면 BE작업을 하자
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  providers: [
    PrismaService
  ]
})

export class AuthModule {};