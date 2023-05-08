//actions.ts
import { deprecated } from 'typesafe-actions';
import {
  blockInfoType,
  setBlockByDragType,
  setBlockLeftSizeType,
  setBlockRightSizeType,
} from './types';
const { createStandardAction } = deprecated;

export const SETBLOCK = 'milestoneBlock/SETBLOCK' as const;
export const SETBLOCKBYDRAG = 'milestoneBlock/SETBLOCKBYDRAG' as const;
export const SETBLOCKLEFTSIZE = 'milestoneBlock/SETBLOCKLEFTSIZE' as const;
export const SETBLOCKRIGHTSIZE = 'milestoneBlock/SETBLOCKRIGHTSIZE' as const;
export const CHANGEBLOCK = 'milestoneBlock/CHANGBLOCK' as const;
export const ADDBLOCK = 'milestoneBlock/ADDBLOCK' as const;
export const DELETEBLOCK = 'milestoneBlock/DELETEBLOCK' as const;

export const setBlock = createStandardAction('milestoneBlock/SETBLOCK')<
  blockInfoType[]
>();

export const setBlockByDrag =
  createStandardAction(SETBLOCKBYDRAG)<setBlockByDragType>();

export const setBlockLeftSize =
  createStandardAction(SETBLOCKLEFTSIZE)<setBlockLeftSizeType>();

export const setBlockRightSize =
  createStandardAction(SETBLOCKRIGHTSIZE)<setBlockRightSizeType>();

export const changeBlock = createStandardAction(CHANGEBLOCK)<{
  newBlock: blockInfoType;
  isSocket: boolean;
}>();

export const addBlock = createStandardAction(ADDBLOCK)<{
  newBlock: blockInfoType;
}>();

export const deleteBlock = createStandardAction(DELETEBLOCK)<{
  blockId: number;
  isSocket: boolean;
}>();
