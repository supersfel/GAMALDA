//types.ts
import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/modal/actions';

export type TestAction = ActionType<typeof actions>;
//actions들의 type들이 모두 뱉어진다.

export type Test = {
  text: string;
};

export type TestState = Test[];
