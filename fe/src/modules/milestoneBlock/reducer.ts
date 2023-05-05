//reducer.ts
import { createReducer } from 'typesafe-actions';
import { changeCol, getNearDate, MILESTONEVAL } from 'utils/milestone';
import {
  dateTostr,
  getDateByDiff,
  getDaysBetweenDates,
  isOverlap,
  isPastDate,
} from 'utils/time';
import {
  ADDBLOCK,
  CHANGEBLOCK,
  DELETEBLOCK,
  SETBLOCK,
  SETBLOCKBYDRAG,
  SETBLOCKLEFTSIZE,
  SETBLOCKRIGHTSIZE,
} from './actions';
import { BlockAction, blockInfoType, BlockState } from './types';
import { deleteBlockApi, updateBlockApi } from 'api/project/api';
import { socket } from 'socket/socket';

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
  [SETBLOCK]: (state, action) => [...action.payload.blockList],
  [SETBLOCKBYDRAG]: (state, action) => {
    const { leftPos, topPos, dayPosMap, id, diff } = action.payload;
    const nearStartDate = getNearDate(leftPos, dayPosMap);
    const newCol = Math.round(topPos / MILESTONEVAL.height) - 1;

    const newBlockInfo = state.map((el) => {
      if (el.blockId !== id) return el;
      const newStart = isPastDate(
        new Date(el.start),
        new Date(getNearDate(0, dayPosMap)),
      )
        ? dateTostr(getDateByDiff(new Date(el.start), diff), 'yyyy-mm-dd')
        : nearStartDate;

      const dayDiff = getDaysBetweenDates(
        new Date(el.start),
        new Date(newStart),
      );

      const newEnd = getDateByDiff(new Date(el.end), dayDiff);
      const newBlock = {
        ...el,
        start: newStart,
        end: dateTostr(newEnd, 'yyyy-mm-dd'),
        col: newCol < 0 ? 0 : newCol,
      };

      return newBlock;
    });
    const chgColBlock = changeCol(newBlockInfo, id);
    updateBlockApi(chgColBlock);
    return newBlockInfo;
  },

  [SETBLOCKLEFTSIZE]: (state, action) => {
    const { id, leftPos, dayPosMap } = action.payload;

    const nearStartDate = getNearDate(leftPos, dayPosMap);
    const newBlockInfo = state.map((el) => {
      if (el.blockId !== id) return el;
      const newBlock = {
        ...el,
        start: nearStartDate,
      };

      return newBlock;
    });
    const chgColBlock = changeCol(newBlockInfo, id);
    updateBlockApi(chgColBlock);
    return newBlockInfo;
  },

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
