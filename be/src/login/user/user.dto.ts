import { IsString } from 'class-validator';

export class UserDataDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly profileImage: string;

  @IsString()
  readonly naverRefresh_token: string;
}

// export interface UserData {
//   email: string,
//   nickname: string,
//   profileImage: string,
//   naverRefresh_token: string,
// }