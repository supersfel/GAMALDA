import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectDto, EnterInfoDto } from './dto/Project.dto';
import { ProjectService } from './project.service';

@Controller('projectinfo')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/loadbytoken')
  async projectLoadByToken(@Body('accessToken') accessToken: string) {
    const ret = await this.projectService.loadProjectByToken(accessToken);
    return ret;
  }

  @Post('/loadbyid')
  async projectLoadById(@Body('projectId') projectId: number) {
    const ret = await this.projectService.loadProjectInfoByProjectId(projectId);
    return ret;
  }

  @Post('/createproject')
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
  @Post('/updateProjInfo')
  async updateProjInfo(
    @Body('projectName') projectName: string,
    @Body('thumbnailUrl') thumbnailUrl: string,
    @Body('projectId') projectId: string,
  ) {
    console.log(projectId, projectName);
    const ret = await this.projectService.updateProjInfo(
      projectName,
      thumbnailUrl,
      projectId,
    );

    return { isChange: ret ? true : false };
  }
}
