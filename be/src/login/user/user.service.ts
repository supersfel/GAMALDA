// BD에서 (로그인하는)유저의 정보가 있는지 여부를 판단하는 api(각각 email과 id를 이용)
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { DBConnectionService } from 'src/db_connection/db_connection.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbConnectService: DBConnectionService,
    private readonly authService: AuthService
  ) { }
  
  /**
   * @param email : string
   * @param needData : boolean
   * @returns DB에서 유저 데이터의 존재 여부(boolean), needData가 true라면 유저 정보 반환
   * { nickname: string, profileImgUrl: string }
   */
  async findUser(email: string, needData?: boolean) {
    const isUserExist = await this.dbConnectService.findUserByEmail(email);
    if (needData) {
      return isUserExist ? {nickname: isUserExist.nickname, profileImgUrl: isUserExist.profileImage} : false
    }
    else {
      return isUserExist ? true : false;
    }
  }

  /**
   * 
   * @param userData : JSON
   * @param accessToken : string
   * @returns DB에 유저 데이터가 만들어졌는지 확인(boolean)
   */
  async createUser(userData: JSON, accessToken: string) {
    const DBuserData = await this.dbConnectService.createUserDate(userData, accessToken);
    return DBuserData ? true : false;
  }

  /**
   * @param email : string
   * @returns 유저의 고유 accessToken
   */
  async getAccessToken(email: string) {
    const accessToken = await this.dbConnectService.getAccessToken(email);
    return accessToken ? accessToken : false;
  }

  /**
   * @param email : string
   * @param token : string
   * @returns 토큰 갱신이 되었는지 확인(boolean)
   */
  async updateAccessToken(email: string, token: string) {
    const updateAccessToken = await this.dbConnectService.updateAccessToken(email, token);
    if (updateAccessToken) {
      return true;
    }
    else {
      return false
    }
  }

  /**
   * 동작 성공시 쿠키에 accessToken을 넣어줌과 함께 메인페이지로 redirect
   * @param accessToken : string
   * @param res : Response
   * @returns 메인페이지로 redirect
   */
  async workSuccess(accessToken: string, res: Response) {
    res.cookie('accessToken', accessToken);
    return res.redirect(process.env.MAIN_PAGE_URL);
  }

  /**
   * 동작 오류 발생시 알림과 함께 메인페이지로 redirect
   * @param res : Response
   * @returns 메인페이지로 redirect
   */
  async workFailure(res: Response) {
    res.write(`<script>alert('There is some Error... Please try again...')</script>`);
    res.write(`<script>window.location="${process.env.MAIN_PAGE_URL}"</script>`);
  }

  /**
   * JSON 형식으로 된 유저 정보를 받아 로그인에 성공하면 accessToken을, 실패하면 false를 반환
   * @param userData : any
   * @returns accessToken: string, false: boolean
   */
  async login(userData: any) {
    const existUser = await this.findUser(userData.email);
    if (!existUser) {
      const access_token = await this.authService.createAccessToken(userData.email);
      const isCreatedUserData = await this.createUser(userData, access_token);
      return isCreatedUserData ? await this.getAccessToken(userData.email) : false;
    }
    else {
      // 유저가 있는 경우
      const accessToken = await this.authService.createAccessToken(userData.email);
      const isUpdated = await this.updateAccessToken(userData.email, accessToken);
      return isUpdated ? accessToken : false
    }
  }

  /**
   * 토큰이 유효하고 유저가 DB상에 존재하면 데이터를 보냄. 위의 조건을 충족하지 않으면 false 반환.
   * @param accessToken 
   * @param res 
   * @returns 유저 정보 OR false
   */
  async verify(accessToken: string, res: Response) {
    const userVerify = await this.authService.verifyToken(accessToken);
    if (userVerify) {
      const isUserExist = await this.findUser(userVerify, true);
      return isUserExist ? res.send(isUserExist) : res.send(false);
    }
    else {
      res.send(false);
    }
  }
}