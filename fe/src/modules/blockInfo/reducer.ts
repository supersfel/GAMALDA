import { createReducer } from 'typesafe-actions';
import { DELETESHOWBLOCKINFO, SETSHOWBLOCKINFO } from './actions';
import { ShowBlockInfoAction, ShowBlockInfoState, ShowBlockInfoType } from './types';


const initialState: ShowBlockInfoState = [
  {
    title: '',
    bgColor: 0,
    blockId: 0,
    projectId: 0,
    manager: ''
  }
];

const showBlockInfo = createReducer<ShowBlockInfoState, ShowBlockInfoAction>(
  initialState,
  {
    [SETSHOWBLOCKINFO]: (state, action) => {
      return [...action.payload];
    },
    [DELETESHOWBLOCKINFO]: (state, payload) => {
      return [
        {
          title: '',
          bgColor: 0,
          blockId: 0,
          projectId: 0,
          manager: ''
        }
      ];
    }
  }
)

export default showBlockInfo;