import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}