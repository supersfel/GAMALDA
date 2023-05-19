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
  accessToken: string;
}

export class EnterInfoDto {
  @IsString()
  enterCode: string;

  @IsString()
  nickName: string;
}