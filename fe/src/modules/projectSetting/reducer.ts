//reducer.ts
import { createReducer } from 'typesafe-actions';
import {
  ProjectSetAction,
  ProjectSetState,
  ProjectSetType,
} from 'modules/projectSetting/types';
import { SETBIGMODALTYPE, SETPROJECTSET } from './actions';

const initialState: ProjectSetType = { bigChangeModalType: 'ADD' };

const projectSet = createReducer<ProjectSetState, ProjectSetAction>(
  initialState,
  {
    [SETPROJECTSET]: (state, action) => {
      return action.payload.projectSet;
    },
    [SETBIGMODALTYPE]: (state, action) => {
      return { ...state, bigChangeModalType: action.payload.type };
    },
  },
);

export default projectSet;
