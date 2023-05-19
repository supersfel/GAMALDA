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

  async loadProjectByToken(accessToken: string) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const projectInfo = await this.dbConnectService.loadProjectInfoByUserId(userId);
    return projectInfo;
  }

  async loadProjectInfoByProjectId(projectId: number) {
    const projectInfo = await this.dbConnectService.loadProjectInfoByProjectId(projectId);
    return projectInfo;
  }

  /**
   * @param projectInfo 
   * @param accessToken 
   * @returns 프로젝트 생성 여부를 판단해 boolean값 반환
   */
  async createProject(projectInfo: ProjectDto, accessToken: string) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const result = await this.dbConnectService.creatProject(projectInfo, userId);
    return (result ? true : false);
  }

  /**
   * @param enterInfo 
   * @param accessToken 
   * @returns 프로젝트 입장이 됬는지 여부를 판단해 boolean값 반환
   */
  async enterProject(enterInfo: EnterInfoDto, accessToken: string) {
    // props는 enterCode와 nickName으로 구성되어있다.
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const isEnter = await this.dbConnectService.enterProjectWithCode(enterInfo, userId);
    return isEnter ? true : false;
  }
}