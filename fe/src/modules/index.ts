import { combineReducers } from 'redux';
import modal from 'modules/modal';
import milestoneBlock from './milestoneBlock';
import projectSetting from './projectSetting';
import userInfo from './userInfo';
import projectInfo from './projectInfo';


const rootReducer = combineReducers({
  modal,
  milestoneBlock,
  projectSetting,
  userInfo,
  projectInfo
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
