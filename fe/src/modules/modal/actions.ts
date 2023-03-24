//actions.ts
import { deprecated, ActionType, createReducer } from 'typesafe-actions';
const { createStandardAction, createAction } = deprecated;

export const TEST = 'todos/TEST' as const;

export const test = (text: string) => ({
  type: TEST,
  payload: {
    text,
  },
});
