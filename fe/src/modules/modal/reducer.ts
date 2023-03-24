//reducer.ts
import { createReducer } from 'typesafe-actions';
import { TEST } from 'modules/modal/actions';
import { TestAction, TestState } from 'modules/modal/types';

const initialState: TestState = [];

const todos = createReducer<TestState, TestAction>(initialState, {
  [TEST]: (state, action) =>
    state.concat({
      ...action.payload,
    }),
});

export default todos;
