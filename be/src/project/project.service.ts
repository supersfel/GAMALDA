import { Injectable } from '@nestjs/common';
import { EnterInfoDto, ProjectDto } from './dto/Project.dto';
import { DBConnectionService } from 'src/db_connection/db_connection.service';
import { AuthService } from 'src/login/auth/auth.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly dbConnectService: DBConnectionService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 유저의 토큰을 이용해 속한 프로젝트의 개수만큼 정보들을 가져온다.
   * @param accessToken 
   * @returns { projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean) }
   */
  async loadProjectByToken(accessToken: string) {
    const userEmail = await this.authService.verifyToken(accessToken);
    const userId = await this.dbConnectService.getUserId(userEmail);
    const projectInfo = await this.dbConnectService.loadProjectInfoByUserId(
      userId,
    );
    return projectInfo;
  }

  /**
   * 프로젝트 ID를 이용해 프로젝트의 정보를 가져온다.
   * @param projectId 
   * @returns { projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean) }

   */
  async loadProjectInfoByProjectId(projectId: number) {
    const projectInfo = await this.dbConnectService.loadProjectInfoByProjectId(
      projectId,
    );
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
    const result = await this.dbConnectService.creatProject(
      projectInfo,
      userId,
    );
    return result ? true : false;
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

    const isEnter = await this.dbConnectService.enterProjectWithCode(
      enterInfo,
      enterInfo.userId,
    );
    return isEnter ? (isEnter === 'exist' ? { isExist: true } : true) : false;
  }

  /**
   * project 이름,썸네일 변경
   * @param projectName
   * @param thumbnailUrl
   * @param projectId
   * @returns
   */
  async updateProjInfo(
    projectName: string,
    thumbnailUrl: string,
    projectId: string,
  ) {
    const ret = await this.dbConnectService.updateProjInfo(
      projectName,
      thumbnailUrl,
      projectId,
    );

    return ret ? true : false;
    //업데이트가 성공했다면 true반환
  }

  /**
   * isPrivate 옵션 업데이트
   * @param isPrivate
   * @param projectId
   * @returns
   */
  async updateIsPrivate(isPrivate: boolean, projectId: string) {
    const ret = await this.dbConnectService.updateIsPrivate(
      isPrivate,
      projectId,
    );

    return ret ? true : false;
  }

  /**
   * userId를 통해서 멤버정보들을 배열로 가져옴
   * @param userIdAry
   * @returns
   */
  async getMemBerInfosByUserId(userIdAry: number[]) {
    const ret = [];

    for (const userId of userIdAry) {
      const userInfo = await this.dbConnectService.getMemBerInfoByUserId(
        userId,
      );

      ret.push(...userInfo[0]);
    }

    return ret.map((v) => {
      return {
        userId: v.userId,
        nickname: v.nickname,
        profileImage: v.profileImage,
      };
    });
  }

  /**
   * userId로 프로젝트 내에서 유저 삭제
   * @param userId
   * @param projectId
   * @returns
   */
  async deleteMemberInProjByUserId(userId: string, projectId: string) {
    const ret = await this.dbConnectService.deleteMemberInProjByUserId(
      userId,
      projectId,
    );
    return ret ? true : false;
  }

  async deleteProject(projectId: string) {
    const ret = await this.dbConnectService.deleteProject(projectId);
    return ret ? true : false;
  }
}
