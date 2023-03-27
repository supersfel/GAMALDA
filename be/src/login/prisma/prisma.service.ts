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
  
  /**
   * @param email 
   * @returns DB에서 가져온 유저 정보
   * { id: number, email: string,  nickname: string, profileImage: string, access_token: string, naverRefresh_token: string }
   */
  async findUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      }
    })
  }

  /**
   * @param createUserReq 
   * @returns DB에 유저 정보를 생성, 생성됬는지 boolean값 return
   */
  async createUserDate(createUserReq: any, accessToken: string) {
    try {
      // console.log(createUserReq.email)
      const test = await prisma.user.create({
        data: {
          email: createUserReq.email,
          nickname: createUserReq.nickname,
          profileImage: createUserReq.profileImage,
          access_token: accessToken,
          naverRefresh_token: createUserReq.naverRefresh_token
        }
      });
      // console.log(`유저의 아이디는 ${test.id}`)
      return true;
    } catch (e) {
      console.log(e);
      return false;
    };
  }

  /**
   * @param email 
   * @returns DB에서 추출한 해당 email을 갖은 유저의 accessToken: string 값을 return
   */
  async getAccessToken(email: string) {
    try {
      const userAccessToken = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          access_token: true,
        }
      });
      return userAccessToken.access_token;
    }
    catch(e) {
      console.log(e);
      return;
    }
    
  }
}