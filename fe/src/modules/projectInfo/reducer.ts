import { createReducer } from 'typesafe-actions';
import {
  ProjectAddAction,
  ProjectAddState,
  ProjectAddType
} from 'modules/projectInfo/types';
import { ADDPROJECT } from './actions';

const initialState: ProjectAddState = [
  {
  title: '',
  subject: '',
  },
];

const addProject = createReducer<ProjectAddState, ProjectAddAction>(
  initialState,
  {
    [ADDPROJECT]: (state, action) => {
      const { newProject } = action.payload;
      const newState = [...state, newProject];
      return newState;
    }
  }
)

export default addProject;