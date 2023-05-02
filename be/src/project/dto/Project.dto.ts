import { IsNumber, IsString } from 'class-validator';

export class ProjectDto {
  @IsNumber()
  projectId: number;
  
  @IsString()
  invicationCode: string;

  @IsString()
  title: string;

  @IsString()
  subject: string;

  @IsString()
  img: string;

  @IsString()
  teamMember: string;

  @IsString()
  private: number;
}