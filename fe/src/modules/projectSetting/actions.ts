//actions.ts
import { deprecated } from 'typesafe-actions';
import { ProjectSetType } from './types';

export const SETPROJECTSET = 'projectSetting/SETPROJECTSET' as const;
export const SETBIGMODALTYPE = 'projectSetting/SETBIGMODALTYPE' as const;
export const SETDAYCNT = 'projectSetting/SETDAYCNT' as const;

export const setProject = (projectSet: ProjectSetType) => ({
  type: SETPROJECTSET,
  payload: {
    projectSet,
  },
});

export const setBigModalType = (type: 'ADD' | 'EDIT') => ({
  type: SETBIGMODALTYPE,
  payload: {
    type,
  },
});

export const setDayCnt = (dayCnt: number) => ({
  type: SETDAYCNT,
  payload: {
    dayCnt,
  },
});
