import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProjectDto, EnterInfoDto } from './dto/Project.dto';
import { ProjectService } from './project.service';

@Controller('projectinfo')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/loadbytoken')
  async projectLoadByToken(@Body('accessToken') accessToken: string) {
    const ret = await this.projectService.loadProjectByToken(accessToken);
    // 여기에 멤버 아이디 추가해주는 로직 추가
    return ret;
  }

  @Get('/:id')
  async projectLoadById(@Param('id') projectId: number) {
    const ret = await this.projectService.loadProjectInfoByProjectId(projectId);
    return ret;
  }

  @Post('/newproject')
  async createProject(
    @Body('projectInfo') projectInfoDto: ProjectDto,
    @Body('accessToken') accessToken: string,
  ) {
    const ret = await this.projectService.createProject(
      projectInfoDto,
      accessToken,
    );
    return ret;
  }

  @Post('/enter')
  async enterProject(
    @Body('enterInfo') enterInfoDto: EnterInfoDto,
    @Body('accessToken') accessToken: string,
  ) {
    const ret = await this.projectService.enterProject(
      enterInfoDto,
      accessToken,
    );
    return ret;
  }

  /**
   * 프로젝트 설정 영역
   * */

  /**
   * 프로젝트 이름, 섬네일 변경
   * @param projectName
   * @param thumbnailUrl
   * @param projectId
   * @returns boolean
   */
  @Patch('/info/:id')
  async updateProjInfo(
    @Body('projectName') projectName: string,
    @Body('thumbnailUrl') thumbnailUrl: string,
    @Param('id') projectId: string,
    @Body('projectSubject') projectSubject: string,
  ) {
    const ret = await this.projectService.updateProjInfo(
      projectName,
      thumbnailUrl,
      projectId,
      projectSubject,
    );

    return { isChange: ret ? true : false };
  }

  @Patch('/private/:id')
  async updateIsPrivate(
    @Body('isPrivate') isPrivate: boolean,
    @Param('id') projectId: string,
  ) {
    const ret = await this.projectService.updateIsPrivate(isPrivate, projectId);
    return ret;
  }

  /**
   * userId 리스트를 받아서 유저 정보로 반환
   * @param userIdAry
   * @returns { userInfos : [{userId : number , nickname : string , profileImage : string}]}
   */
  @Post('/membersinfo')
  async getMemBerInfosByUserId(@Body('userIdAry') userIdAry: string) {
    const props = userIdAry.split(',').map((v) => +v);
    const ret = await this.projectService.getMemBerInfosByUserId(props);
    return JSON.stringify({
      userInfos: ret,
    });
  }

  /**
   * userId로 프로젝트안에서 유저 삭제
   * @param userId
   * @returns
   */
  @Delete('/member')
  async deleteMemberInProjByUserId(
    @Query('userId') userId: string,
    @Query('projectId') projectId: string,
  ) {
    const ret = await this.projectService.deleteMemberInProjByUserId(
      userId,
      projectId,
    );
    return ret;
  }

  /**
   * 프로젝트 자체를 삭제
   * @param projectId
   * @returns
   */
  @Delete()
  async deleteProject(@Query('projectId') projectId: string) {
    const ret = await this.projectService.deleteProject(projectId);
    return ret;
  }
}
