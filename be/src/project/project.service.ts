import { Injectable } from '@nestjs/common';
import { ProjectDto } from './dto/Project.dto';
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
    const projectInfo = await this.dbConnectService.loadProjectInfoByToken(userId);
    return projectInfo;
  }

  async loadProjectById(projectId: number) {
    const projectInfo = await this.dbConnectService.loadProjectInfoById(projectId);
    return projectInfo;
  }
}