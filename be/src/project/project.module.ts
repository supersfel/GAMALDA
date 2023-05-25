import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DBConnectionService } from 'src/db_connection/db_connection.service';
import { AuthModule } from 'src/login/auth/auth.module';
import { AuthService } from 'src/login/auth/auth.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';


@Module({
  imports:[AuthModule],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    DBConnectionService,
    AuthService,
    JwtService
  ]
})

export class ProjectModule {}