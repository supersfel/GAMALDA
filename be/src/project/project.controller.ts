import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectDto, EnterInfoDto } from './dto/Project.dto';
import { ProjectService } from './project.service';

@Controller('projectinfo')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  
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
  async createProject(@Body('projectInfo') projectInfoDto: ProjectDto, @Body('accessToken') accessToken: string) {
    const ret = await this.projectService.createProject(projectInfoDto, accessToken);
    return ret;
  }

  @Post('/enter')
  async enterProject(@Body('enterInfo') enterInfoDto: EnterInfoDto, @Body('accessToken') accessToken: string) {
    const ret = await this.projectService.enterProject(enterInfoDto, accessToken)
    return ret;
  }
}