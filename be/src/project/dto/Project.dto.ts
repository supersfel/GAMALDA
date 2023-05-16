import { IsNumber, IsString } from 'class-validator';

export class ProjectDto {
  // @IsNumber()
  // projectId: number;
  
  @IsString()
  invitationCode: string;

  @IsString()
  title: string;

  @IsString()
  subject: string;

  @IsString()
  img: string;

  @IsString()
  teamMember: string;

  @IsNumber()
  isPrivate: number;

  @IsString()
  cookie: string;
}