//reducer.ts
import { createReducer } from 'typesafe-actions';
import { changeCol, getNearDate } from 'utils/milestone';

import {
  ADDBLOCK,
  CHANGEBLOCK,
  DELETEBLOCK,
  SETBLOCK,
  SETBLOCKRIGHTSIZE,
} from './actions';
import { BlockAction, blockInfoType, BlockState } from './types';
import { deleteBlockApi, updateBlockApi } from 'api/project/api';

const initialState: BlockState = [
  {
    title: '',
    manager: '',
    progress: 1,
    importance: 0,
    bgColor: 0,
    start: '2020-04-01',
    end: '2020-04-02',
    col: 0,
    subTitle: [''],
    blockId: 0,
    projectId: 0,
  },
];

const milestoneBlock = createReducer<BlockState, BlockAction>(initialState, {
  //   [OFFMODAL]: (state, action) => {
  //     return { name: action.payload.name, idx: action.payload.idx };
  //   },
  [SETBLOCK]: (state, action) => [...action.payload],

  [SETBLOCKRIGHTSIZE]: (state, action) => {
    const { leftPos, dayPosMap, id, width } = action.payload;
    let nearEndDate = getNearDate(leftPos + width, dayPosMap);
    const newBlockInfo = state.map((el) => {
      if (el.blockId !== id) return el;
      const newBlock = {
        ...el,
        end: nearEndDate,
      };
      return newBlock;
    });
    const chgColBlock = changeCol(newBlockInfo, id);
    updateBlockApi(chgColBlock);
    return newBlockInfo;
  },

  [CHANGEBLOCK]: (state, action) => {
    const { newBlock, isSocket } = action.payload;
    const newBlockInfo = state.map((el: blockInfoType) => {
      if (el.blockId !== newBlock.blockId) return el;
      return {
        ...newBlock,
      };
    });
    const chgColBlock = changeCol(newBlockInfo, newBlock.blockId);
    if (!isSocket) updateBlockApi(chgColBlock);
    return newBlockInfo;
  },

  [ADDBLOCK]: (state, action) => {
    const { newBlock } = action.payload;
    const newBlockInfo = [...state, newBlock];
    changeCol(newBlockInfo, newBlock.blockId);
    return newBlockInfo;
  },

  [DELETEBLOCK]: (state, action) => {
    const { blockId, isSocket } = action.payload;
    if (!isSocket) deleteBlockApi({ blockId });
    const newBlockInfo = state.filter(
      (el: blockInfoType) => el.blockId !== blockId,
    );
    return newBlockInfo;
  },
});

export default milestoneBlock;
