import { IsNumber, IsString } from 'class-validator';

export class ProjectDto {

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
  userId: number;
}