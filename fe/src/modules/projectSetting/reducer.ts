//reducer.ts
import { createReducer } from 'typesafe-actions';
import {
  ProjectSetAction,
  ProjectSetState,
  ProjectSetType,
} from 'modules/projectSetting/types';
import { SETBIGMODALTYPE, SETDAYCNT, SETPROJECTSET } from './actions';

const initialState: ProjectSetType = {
  bigChangeModalType: 'ADD',
  dayCnt: 40,
};

const projectSet = createReducer<ProjectSetState, ProjectSetAction>(
  initialState,
  {
    [SETPROJECTSET]: (state, action) => {
      return action.payload.projectSet;
    },
    [SETBIGMODALTYPE]: (state, action) => {
      return { ...state, bigChangeModalType: action.payload.type };
    },
    [SETDAYCNT]: (state, action) => {
      return { ...state, dayCnt: action.payload.dayCnt };
    },
  },
);

export default projectSet;
