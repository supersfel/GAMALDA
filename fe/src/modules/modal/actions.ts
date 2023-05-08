//actions.ts
import { ModalNameType } from './types';

export const SETMODAL = 'modal/SETMODAL' as const;
export const OFFMODAL = 'modal/OFFMODAL' as const;
export const ADDMODAL = 'modal/ADDMODAL' as const;

export const setModal = (name: ModalNameType, idx: number) => ({
  type: SETMODAL,
  payload: {
    name,
    idx,
  },
});

export const offModal = () => ({
  type: OFFMODAL,
});
