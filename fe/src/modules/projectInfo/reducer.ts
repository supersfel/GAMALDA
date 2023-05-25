import { createReducer } from 'typesafe-actions';
import {
  ProjectAddAction,
  ProjectAddState,
} from 'modules/projectInfo/types';
import { ADDPROJECT, GETONEPROJECTINFO, OFFINFOMODAL } from './actions';

const initialState: ProjectAddState = {
    projectId: 0,
    invitationCode: '',
    title: '',
    subject: '',
    img: '',
    teamMember: '',
    isPrivate: false,
};

const projectInfo = createReducer<ProjectAddState, ProjectAddAction>(
  initialState,
  {
    [ADDPROJECT]: (state, action) => {
      return { ...action.payload }
    },
    [GETONEPROJECTINFO]: (state, action) => {
      return { ...action.payload }
    },
    [OFFINFOMODAL]: (state, action) => {
      return {
        projectId: 0,
        invitationCode: '',
        title: '',
        subject: '',
        img: '',
        teamMember: '',
        isPrivate: false,
      };
    }
  }
)

export default projectInfo;