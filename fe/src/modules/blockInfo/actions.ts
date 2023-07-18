import { type } from 'os';
import { ShowBlockInfoType } from './types';

export const SETSHOWBLOCKINFO = 'blockInfo/SETBLOCKINFO' as const;
export const DELETESHOWBLOCKINFO = 'blockInfo/DELETEBLOCKINFO' as const;

export const setShowBlockInfo = (payload: ShowBlockInfoType[]) => ({
  type: SETSHOWBLOCKINFO,
  payload
})

export const deleteShowBlockInfo = () => ({
  type: DELETESHOWBLOCKINFO
})