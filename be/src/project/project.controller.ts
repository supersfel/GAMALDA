import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectDto } from './dto/Project.dto';
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
}