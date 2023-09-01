//modules/thunks.ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {
  BlockAction,
  blockInfoType,
  setBlockByDragType,
  setBlockLeftSizeType,
  setBlockRightSizeType,
} from './types';
import { setBlock } from './actions';
import { MILESTONEVAL, changeCol, getNearDate } from 'utils/milestone';
import {
  dateTostr,
  getDateByDiff,
  getDaysBetweenDates,
  isPastDate,
} from 'utils/time';
import { updateBlockApi } from 'api/project/api';
import { socket } from 'socket/socket';

/**
 * 드래그로 블록 움직일때
 */
export const setBlockByDragAsync = (
  payload: setBlockByDragType,
): ThunkAction<void, RootState, null, BlockAction> => {
  //리턴타입, Root상태, ExtraArgument타입, action의 타입 순서대로 넣음
  const { leftPos, topPos, dayPosMap, id, diff, projectId } = payload;

  return async (dispatch, getState) => {
    const state = getState().milestoneBlock;
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
    dispatch<BlockAction>(setBlock(newBlockInfo));
    //api 업데이트 후 소켓 전송
    await updateBlockApi(chgColBlock);
    socket.emit('changeBlock', projectId, id);
  };
};

/**
 * 좌측 사이즈로 블록 변경
 */
export const setBlockLeftSizeAsync = (
  payload: setBlockLeftSizeType,
): ThunkAction<void, RootState, null, BlockAction> => {
  //리턴타입, Root상태, ExtraArgument타입, action의 타입 순서대로 넣음
  const { id, leftPos, dayPosMap, projectId } = payload;

  return async (dispatch, getState) => {
    const state = getState().milestoneBlock;
    let nearStartDate = getNearDate(leftPos, dayPosMap);

    const newBlockInfo = state.map((el) => {
      if (el.blockId !== id) return el;
      if (!isPastDate(new Date(nearStartDate), new Date(el.end))) {
        const date = new Date(el.end);
        date.setDate(date.getDate() - 1);
        nearStartDate = dateTostr(date, 'yyyy-mm-dd');
      }
      const newBlock = {
        ...el,
        start: nearStartDate,
      };

      return newBlock;
    });
    const chgColBlock = changeCol(newBlockInfo, id);
    dispatch<BlockAction>(setBlock(newBlockInfo));
    await updateBlockApi(chgColBlock);
    socket.emit('changeBlock', projectId, id);
  };
};

export const setBlockRightSizeAsync = (
  payload: setBlockRightSizeType,
): ThunkAction<void, RootState, null, BlockAction> => {
  //리턴타입, Root상태, ExtraArgument타입, action의 타입 순서대로 넣음
  const { leftPos, dayPosMap, id, width, projectId } = payload;

  return async (dispatch, getState) => {
    const state = getState().milestoneBlock;
    let nearEndDate = getNearDate(leftPos + width, dayPosMap);
    const newBlockInfo = state.map((el) => {
      if (el.blockId !== id) return el;

      //블록이 망가지는거 방지
      if (isPastDate(new Date(nearEndDate), new Date(el.start))) {
        const date = new Date(el.start);
        date.setDate(date.getDate() + 1);
        nearEndDate = dateTostr(date, 'yyyy-mm-dd');
      }
      const newBlock = {
        ...el,
        end: nearEndDate,
      };
      return newBlock;
    });
    const chgColBlock = changeCol(newBlockInfo, id);
    dispatch<BlockAction>(setBlock(newBlockInfo));
    await updateBlockApi(chgColBlock);
    socket.emit('changeBlock', projectId, id);
  };
};

/**
 * changeBlock => updateApi => socket전송이 되도록
 */
export const changeBlockAsync = (payload: {
  newBlock: blockInfoType;
  isSocket: boolean;
  projectId: string;
}): ThunkAction<void, RootState, null, BlockAction> => {
  //리턴타입, Root상태, ExtraArgument타입, action의 타입 순서대로 넣음
  const { newBlock, isSocket, projectId } = payload;

  return async (dispatch, getState) => {
    const state = getState().milestoneBlock;
    const newBlockInfo = state.map((el: blockInfoType) => {
      if (el.blockId !== newBlock.blockId) return el;
      return {
        ...newBlock,
      };
    });
    const chgColBlock = changeCol(newBlockInfo, newBlock.blockId);
    dispatch<BlockAction>(setBlock(newBlockInfo));
    if (!isSocket) {
      await updateBlockApi(chgColBlock);
      socket.emit('changeBlock', projectId, newBlock.blockId);
    }
  };
};
