//reducer.ts
import { createReducer } from 'typesafe-actions';
import { OFFMODAL, SETMODAL } from 'modules/modal/actions';
import { ModalAction, ModalState } from 'modules/modal/types';

const initialState: ModalState = { name: '', idx: 0 };

const modal = createReducer<ModalState, ModalAction>(initialState, {
  [SETMODAL]: (state, action) => {
    return { name: action.payload.name, idx: action.payload.idx };
  },
  [OFFMODAL]: (state, action) => {
    return { name: '', idx: 0 };
  },
});

export default modal;
