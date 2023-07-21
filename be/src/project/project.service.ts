import { Injectable } from '@nestjs/common';
import { EnterInfoDto, ProjectDto } from './dto/Project.dto';
import { DBConnectionService } from 'src/db_connection/db_connection.service';
import { AuthService } from 'src/login/auth/auth.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly dbConnectService: DBConnectionService,
    private readonly authService: AuthService
  ) { }

  /**
   * 유저의 토큰을 이용해 속한 프로젝트의 개수만큼 정보들을 가져온다.
   * @param accessToken 
   * @returns { projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean) }
   */
  async loadProjectByToken(accessToken: string) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const projectInfo = await this.dbConnectService.loadProjectInfoByUserId(userId);
    return projectInfo;
  }

  /**
   * 프로젝트 ID를 이용해 프로젝트의 정보를 가져온다.
   * @param projectId 
   * @returns { projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean) }
   */
  async loadProjectInfoByProjectId(projectId: number) {
    const projectInfo = await this.dbConnectService.loadProjectInfoByProjectId(projectId);
    return projectInfo;
  }

  /**
   * 프로젝트 생성 여부를 판단
   * @param projectInfo 
   * @param accessToken 
   * @returns  boolean
   */
  async createProject(projectInfo: ProjectDto, accessToken: string) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const result = await this.dbConnectService.creatProject(projectInfo, userId);
    return (result ? true : false);
  }

  /**
   * 프로젝트 입장이 됬는지 여부를 판단
   * @param enterInfo 
   * @param accessToken 
   * @returns  boolean
   */
  async enterProject(enterInfo: EnterInfoDto, accessToken: string) {
    // props는 enterCode와 userId로 구성되어있다.
    const userEmail = await this.authService.verifyToken(accessToken);
    const isEnter = await this.dbConnectService.enterProjectWithCode(enterInfo, enterInfo.userId);
    return isEnter ? (isEnter === 'exist' ? {isExist: true} : true) : false;
  }
}