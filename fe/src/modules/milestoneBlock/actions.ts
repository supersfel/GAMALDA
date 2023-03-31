//actions.ts
import { deprecated } from 'typesafe-actions';
import {
  blockInfoType,
  changeBlockType,
  setBlockByDragType,
  setBlockLeftSizeType,
  setBlockRightSizeType,
} from './types';

export const SETBLOCK = 'milestoneBlock/SETBLOCK' as const;
export const SETBLOCKBYDRAG = 'milestoneBlock/SETBLOCKBYDRAG' as const;
export const SETBLOCKLEFTSIZE = 'milestoneBlock/SETBLOCKLEFTSIZE' as const;
export const SETBLOCKRIGHTSIZE = 'milestoneBlock/SETBLOCKRIGHTSIZE' as const;
export const CHANGEBLOCK = 'milestoneBlock/CHANGBLOCK' as const;

export const setBlock = (blockList: blockInfoType[]) => ({
  type: SETBLOCK,
  payload: {
    blockList,
  },
});

export const setBlockByDrag = (payload: setBlockByDragType) => ({
  type: SETBLOCKBYDRAG,
  payload,
});

export const setBlockLeftSize = (payload: setBlockLeftSizeType) => ({
  type: SETBLOCKLEFTSIZE,
  payload,
});

export const setBlockRightSize = (payload: setBlockRightSizeType) => ({
  type: SETBLOCKRIGHTSIZE,
  payload,
});

export const changeBlock = (payload: changeBlockType) => ({
  type: CHANGEBLOCK,
  payload,
});
