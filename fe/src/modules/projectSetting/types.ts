//types.ts
import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/projectSetting/actions';

export type ProjectSetAction = ActionType<typeof actions>;
//actions들의 type들이 모두 뱉어진다.

export type ProjectSetType = {
  bigChangeModalType: 'ADD' | 'EDIT';
  dayCnt: number;
};

export type ProjectSetState = ProjectSetType;
