//types.ts
import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/userInfo/actions';

export type UserStateAction = ActionType<typeof actions>;
//actions들의 type들이 모두 뱉어진다.

export type User = {
  loginState: boolean;
  userId: number,
  nickName: string;
  profileImgUrl: string;
  userEmail: string;
};

export type UserState = User;
