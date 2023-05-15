import { createReducer } from 'typesafe-actions';
import {
  ProjectAddAction,
  ProjectAddState,
} from 'modules/projectInfo/types';
import { GETONEPROJECTINFO, OFFINFOMODAL } from './actions';

const initialState: ProjectAddState = {
    projectId: 0,
    invitationCode: '',
    title: '',
    subject: '',
    img: '',
    teamMember: '',
    isPrivate: false,
};

const addProject = createReducer<ProjectAddState, ProjectAddAction>(
  initialState,
  {
    // [ADDPROJECT]: (state, action) => {
    //   const { newProject } = action.payload;
    //   const newState = [newProject];
    //   return newState;
    // },
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

export default addProject;