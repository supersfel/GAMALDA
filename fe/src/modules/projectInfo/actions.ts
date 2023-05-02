import { ProjectAddType } from './types';


export const ADDPROJECT = 'projectInfo/ADDPROJECT' as const;

export const addProject = (payload: {newProject: ProjectAddType}) => ({
  type: ADDPROJECT,
  payload
});