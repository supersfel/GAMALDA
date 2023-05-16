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
      return {
        projectId: action.payload.projectId,
        invitationCode: action.payload.invitationCode,
        title: action.payload.title,
        subject: action.payload.subject,
        img: action.payload.img,
        teamMember: action.payload.teamMember,
        isPrivate: action.payload.isPrivate,
      }
    },
    [GETONEPROJECTINFO]: (state, action) => {
      return {
        projectId: action.payload.projectId,
        invitationCode: action.payload.invitationCode,
        title: action.payload.title,
        subject: action.payload.subject,
        img: action.payload.img,
        teamMember: action.payload.teamMember,
        isPrivate: action.payload.isPrivate,
      }
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