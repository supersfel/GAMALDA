import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { BlockDto } from 'src/block/dto/Block.dto';

@Injectable()
export class DBConnectionService implements OnModuleInit {
  public ConnectDB: mysql.Pool;
  constructor() { }

  sendQuery = async (query: string) => {
    try {
      const ret = await this.ConnectDB.query(query);
      return ret;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  async onModuleInit() {
    this.ConnectDB = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: 50,
    });
    console.log('🚗 DB와 연결되었다🚗');
  }

  /**
   * @param email
   * @returns DB에서 가져온 유저 정보 object 타입으로 반환
   * { access_token: string }
   */
  async findUserByEmail(email: string) {
    try {
      const userInfo = await this.ConnectDB.query(
        `SELECT * FROM User WHERE email="${email}"`,
      );
      return userInfo[0][0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * @param createUserReq
   * @returns DB에 유저 정보를 생성, 생성됬는지 boolean값 return
   */
  async createUserDate(createUserReq: any, accessToken: string) {
    try {
      await this.ConnectDB.query(
        `INSERT INTO User (email,nickname,profileImage,access_token,naverRefresh_token) VALUES("${createUserReq.email}","${createUserReq.nickname}","${createUserReq.profileImage}","${accessToken}","${createUserReq.naverRefresh_token}")`,
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * @param email
   * @returns DB에서 추출한 해당 email을 갖은 유저의 accessToken: string 값을 return
   */
  async getAccessToken(email: string) {
    try {
      const access_token = await this.ConnectDB.query(
        `SELECT access_token FROM User WHERE email="${email}"`,
      );
      return access_token[0][0].access_token;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   *
   * @param email
   * @param token
   * @returns accessToken 업데이트 여부(boolean)
   */
  async updateAccessToken(email: string, token: string) {
    try {
      await this.ConnectDB.query(
        `UPDATE User SET access_token="${token}" WHERE email="${email}"`,
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * block 생성
   * @param block
   * @returns
   */
  async createBlock(block: BlockDto) {
    const query = `INSERT INTO Block (title, manager, progress, importance, bgColor, start, end, col, subTitle,projectId) VALUES ("${block.title
      }", "${block.manager}", "${block.progress}", "${block.importance}", "${block.bgColor
      }", "${block.start}", "${block.end}", "${block.col
      }", "${block.subTitle.join(',')}","${block.projectId}")`;
    return await this.sendQuery(query);
  }

  async readBlocks(projectId: string) {
    const query = `SELECT * FROM Block WHERE projectId=${projectId}`;
    return await this.sendQuery(query);
  }

  async updateBlock(block: BlockDto) {
    const query = `UPDATE Block SET title = '${block.title}', manager = '${block.manager}' , progress = ${block.progress} , importance = ${block.importance} , bgColor = ${block.bgColor} , start = '${block.start}' , end = '${block.end}' , col = ${block.col} , subTitle = '${block.subTitle}' WHERE blockId = ${block.blockId}
    `;
    return await this.sendQuery(query);
  }

  async deleteBlock(blockId: string) {
    const query = `DELETE FROM Block WHERE blockId= '${blockId}'`;
    const ret = await this.sendQuery(query);
    return ret;
  }

  async readBlock(blockId: string) {
    const query = `SELECT * FROM Block WHERE blockId=${blockId}`;
    return await this.sendQuery(query);
  }

  // async loadProjectInfo(userEmail: string) {
  //   const query = `SELECT projectId FROM User_Project JOIN User ON User.userId=User_Project.userId WHERE User.email="${userEmail}"`
  //   const ret = await this.sendQuery(query);
  //   const projectIds = await ret[0][0].projectId.split(', ');
  //   return projectIds;
  // }

  async loadProjectInfo(userId: number) {
    const query1 = `SELECT projectId FROM User_Project WHERE userId="${userId}"`
    const projectIds = (await this.sendQuery(query1))[0][0].projectId.split(', ');
    const projectInfo = await Promise.all(projectIds.map(async (projectId: string) => {
      const test = await this.sendQuery(`SELECT * FROM Project WHERE projectId="${projectId}"`);
      return test[0][0]
    }));
    return projectInfo;
  }

  async getUserId(userEmail: string) {
    const query = `SELECT userId FROM User WHERE email="${userEmail}"`;
    const ret = (await this.sendQuery(query))[0][0].userId;
    return ret;
  }
}
