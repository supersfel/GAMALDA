//modules/thunks.ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { BlockAction, setBlockByDragType } from './types';
import { setBlockByDrag } from './actions';

export function setBlockByDragAsync(
  payload: setBlockByDragType,
): ThunkAction<void, RootState, null, BlockAction> {
  //리턴타입, Root상태, ExtraArgument타입, action의 타입 순서대로 넣음
  const { leftPos, topPos, dayPosMap, id, diff } = payload;
  async function waitOneSecond() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('1초가 지났습니다.');
  }
  return async (dispatch) => {
    dispatch<BlockAction>(
      setBlockByDrag({ leftPos, topPos, dayPosMap, id, diff }),
    );
  };
}
