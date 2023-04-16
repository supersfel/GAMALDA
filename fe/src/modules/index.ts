import { combineReducers } from 'redux';
import modal from 'modules/modal';
import milestoneBlock from './milestoneBlock';
import userInfo from './userInfo';

const rootReducer = combineReducers({
  modal,
  milestoneBlock,
  userInfo
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
