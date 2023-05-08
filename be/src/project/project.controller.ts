import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectDto } from './dto/Project.dto';
import { ProjectService } from './project.service';

@Controller('projectinfo')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  
  @Post('/load')
  async projectLoad(@Body('accessToken') accessToken: string) {
    const ret = await this.projectService.loadProject(accessToken);
    return ret
  }
}