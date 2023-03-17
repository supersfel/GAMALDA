import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class PrismaService extends PrismaClient
implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
  
  // email로 유저 찾기
  async findUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      }
    })
  }

  //  유저 데이터 DB에 저장
  async createUserDate(createUserReq: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: {
        email: createUserReq.email,
        nickname: createUserReq.nickname,
        profileImage: createUserReq.profileImage,
        access_token: createUserReq.access_token,
        naverRefresh_token: createUserReq.naverRefresh_token
      }
    });
  }
}