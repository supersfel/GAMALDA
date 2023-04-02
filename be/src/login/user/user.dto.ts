// 정보가 get되는지 확인되면 BE작업을 하자

import { IsString } from 'class-validator';

export class GithubCodeDto {
  @IsString()
  readonly code: string;
}