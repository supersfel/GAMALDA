import { ProjectInfoType } from './types';
import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;

// export const ADDPROJECT = 'projectInfo/ADDPROJECT' as const;
export const GETONEPROJECTINFO = 'projectInfo/GETONEPROJECTINFO' as const;
export const OFFINFOMODAL = 'projectInfo/OFFINFOMODAL' as const;

// export const addProject = (payload: {newProject: ProjectInfoType}) => ({
//   type: ADDPROJECT,
//   payload
// });

/**
 * redux에 한개의 프로젝트 정보 올리기
 * @param 프로젝트 정보
 */
export const getOneProjectInfo = (payload: ProjectInfoType ) => ({
  type: GETONEPROJECTINFO,
  payload
});

/**
 * offModal시 프로젝트 state 초기화
 */
export const offInfoModal = () => ({
  type: OFFINFOMODAL
})