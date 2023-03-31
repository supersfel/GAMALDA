import { combineReducers } from 'redux';
import modal from 'modules/modal';
import milestoneBlock from './milestoneBlock';

const rootReducer = combineReducers({
  modal,
  milestoneBlock,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
