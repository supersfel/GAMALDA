import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/blockInfo/actions'

export type ShowBlockInfoAction = ActionType<typeof actions>;

export type ShowBlockInfoType = {
  title: string;
  bgColor: number;
  blockId: number;
  projectId: number;
};

export type ShowBlockInfoState = ShowBlockInfoType[];