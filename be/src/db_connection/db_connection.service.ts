import { ConsoleLogger, Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { BlockDto } from 'src/block/dto/Block.dto';
import { EnterInfoDto, ProjectDto } from 'src/project/dto/Project.dto';
import { UserData } from 'src/types';

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
  async createUserDate(createUserReq: UserData, accessToken: string) {
    try {
      const query1 = `INSERT INTO User (email,nickname,profileImage,access_token,naverRefresh_token) VALUES("${createUserReq.email}","${createUserReq.nickname}","${createUserReq.profileImage}","${accessToken}","${createUserReq.naverRefresh_token}")`;
      const createDataInUser = await this.sendQuery(query1);
      const userId = await this.getUserId(createUserReq.email);
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

  /**
   * 토큰 전달 시 객체 형식으로 된 프로젝트 정보 반환
   * @param userId 
   * @returns projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean), manager: string
   */
  async loadProjectInfoByUserId(userId: number) {
    const query1 = `SELECT projectId FROM User_Project WHERE userId="${userId}"`
    const projectIds = (await this.sendQuery(query1))[0].map((e: { projectId: string }) => e.projectId);
    const projectInfo = await Promise.all(projectIds.map(async (projectId: string) => {
      const info = (await this.sendQuery(`SELECT * FROM Project WHERE projectId="${projectId}"`))[0][0];
      return info;
    }));
    return projectInfo;
  }

  /**
   * 프로젝트 고유 ID 전달 시 객체 형식으로 된 프로젝트 정보 반환
   * @param projectId 
   * @returns projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean), manager: string
   */
  async loadProjectInfoByProjectId(projectId: number) {
    const query = `SELECT * FROM Project WHERE projectId="${projectId}"`;
    const projectInfo = (await this.sendQuery(query))[0][0];
    projectInfo.teamMember = [...await Promise.all(projectInfo.teamMember.split(', ').map(async (e) => {
      const result = (await this.getUserNickname(+e));
      return result;
    }))].join(', ');
    return projectInfo;
  }

  /**
   * 유저 이메일을 이용해 유저 아이디 반환
   * @param userEmail 
   * @returns userId
   */
  async getUserId(userEmail: string) {
    const query = `SELECT userId FROM User WHERE email="${userEmail}"`;
    const ret = (await this.sendQuery(query))[0][0].userId;
    return ret;
  }

  /**
   * @param projectInfo 
   * @param userId 
   * @returns 프로젝트가 생성되었다는 query 반환문을 반환. 에러 발생시 false를 반환
   */
  async creatProject(projectInfo: ProjectDto, userId: number) {
    const query1 = `INSERT INTO Project (invitationCode, title, subject, img, teamMember, isPrivate, manager) VALUES ("${Math.random().toString(36).substring(2, 12)}", "${projectInfo.title}", "${projectInfo.subject}", "${projectInfo.img}", "${userId}", "${projectInfo.isPrivate}", "${userId}")`
    const createdProjectId = (await this.sendQuery(query1))[0].insertId;
    const query2 = `INSERT INTO User_Project (userId,projectId) VALUES("${userId}","${createdProjectId}")`;
    const createUserProject = (await this.sendQuery(query2))[0].insertId ? true : false;
    if (createUserProject) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * 유저가 프로젝트에 있는지 없는지 판단 후 없다면 프로젝트에 입장
   * @param enterInfo 
   * @param userId 
   * @returns boolean
   */
  async enterProjectWithCode(enterInfo: EnterInfoDto, userId: number) {
    const query1 = `SELECT projectId FROM Project WHERE invitationCode="${enterInfo.enterCode}"`;
    const projectId = (await this.sendQuery(query1))[0][0]?.projectId;
    const isAlreadExistInProject = await this.isAlreadExistInProject(projectId, userId);
    if (!projectId || isAlreadExistInProject) {
      return 'exist';
    }
    // 올바른 코드이며, 유저가 해당 프로젝트에 참가되있지 않을 때
    const query2 = `UPDATE Project SET teamMember=CONCAT(teamMember,", ${userId}") WHERE invitationCode="${enterInfo.enterCode}"`;
    const query3 = `INSERT INTO User_Project (userId, projectId) VALUES("${userId}","${projectId}")`;
    const isEnterUseridPro = await this.sendQuery(query2);
    if (isEnterUseridPro) {
      const isEnterProIdUser = await this.sendQuery(query3);
      return isEnterProIdUser;
    }
    else {
      return false;
    }
  };

  /**
   * 유저가 이미 프로젝트에 있다면 true, 없다면 false를 반환
   * @param projectId 
   * @param userId 
   * @returns boolean
   */
  async isAlreadExistInProject(projectId: number, userId: number) {
    const query1 = `SELECT projectId FROM User_Project WHERE userId="${userId}"`;
    const projectIds = (await this.sendQuery(query1))[0].map(e => e.projectId);
    const isExist = projectIds.includes(`${projectId}`);
    return isExist;
  }

  /**
   * 유저의 아이디를 이용해 유저 닉네임을 반환하는 함수
   * @param userId: number
   * @returns nickname: string
   */
  async getUserNickname(userId: number) {
    const query = `SELECT nickname FROM User WHERE userId="${userId}"`;
    const nickname = (await this.sendQuery(query))[0][0].nickname;
    return nickname
  }
}