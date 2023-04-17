//types.ts
import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/modal/actions';

export type ModalAction = ActionType<typeof actions>;
//actions들의 type들이 모두 뱉어진다.

export type ModalNameType =
  | ''
  | 'contextMenuInBlock'
  | 'smallModalChangeInfo'
  | 'bigModalChangeInfo'
  | 'contextMenuInCalendar';

export type Modal = {
  name: ModalNameType;
  idx: number;
};

export type ModalState = Modal;
