//types.ts
import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/milestoneBlock/actions';

export type BlockAction = ActionType<typeof actions>;
//actions들의 type들이 모두 뱉어진다.

export interface blockInfoType {
  title: string;
  manager: string;
  progress: number;
  importance: number;
  bgColor: number;
  start: string;
  end: string;
  col: number;
  subTitle: string[];
  blockId: number;
  projectId: number;
}

export type BlockState = blockInfoType[];

export interface setBlockByDragType {
  leftPos: number;
  topPos: number;
  dayPosMap: Map<string, string>;
  id: number;
  diff: number;
  projectId: string;
}

export interface setBlockLeftSizeType {
  id: number;
  leftPos: number;
  dayPosMap: Map<string, string>;
  projectId: string;
}

export interface setBlockRightSizeType {
  id: number;
  leftPos: number;
  dayPosMap: Map<string, string>;
  width: number;
  projectId: string;
}
