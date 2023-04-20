import { Injectable, OnModuleInit } from "@nestjs/common";
import * as mysql from "mysql2/promise";

@Injectable()
export class DBConnectionService implements OnModuleInit {
  public ConnectDB: mysql.Pool;
  constructor() {}
  
  async onModuleInit() {
    this.ConnectDB = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: 50
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
      const userInfo = await this.ConnectDB.query(`SELECT * FROM User WHERE email="${email}"`)
      return userInfo[0][0]
    }
    catch (e) {
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
      await this.ConnectDB.query(`INSERT INTO User (email,nickname,profileImage,access_token,naverRefresh_token) VALUES("${createUserReq.email}","${createUserReq.nickname}","${createUserReq.profileImage}","${accessToken}","${createUserReq.naverRefresh_token}")`)
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
      const access_token = await this.ConnectDB.query(`SELECT access_token FROM User WHERE email="${email}"`)
      return access_token[0][0].access_token;
    }
    catch(e) {
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
  async updateAccessToken(email: string,token: string) {
    try {
      await this.ConnectDB.query(`UPDATE User SET access_token="${token}" WHERE email="${email}"`);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }
}