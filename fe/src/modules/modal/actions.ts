//actions.ts
import { deprecated } from 'typesafe-actions';

export const SETMODAL = 'modal/SETMODAL' as const;
export const OFFMODAL = 'modal/OFFMODAL' as const;
export const ADDMODAL = 'modal/ADDMODAL' as const;

export const setModal = (name: string, idx: number) => ({
  type: SETMODAL,
  payload: {
    name,
    idx,
  },
});

export const offModal = () => ({
  type: OFFMODAL,
});
