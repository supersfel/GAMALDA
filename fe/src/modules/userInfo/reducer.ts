import { createReducer } from 'typesafe-actions';
import { SETUSERLOGIN, SETUSERLOGOUT } from './actions';
import { UserState, UserStateAction } from './types';

const initialState: UserState = {
  loginState: false,
  userId: 0,
  nickName: '',
  profileImgUrl: ''
};


const userInfo = createReducer<UserState, UserStateAction>(initialState, {
  [SETUSERLOGIN]: (state, action) => {
    return {
      loginState: action.payload.loginState,
      userId: action.payload.userId,
      nickName: action.payload.nickName,
      profileImgUrl: action.payload.profileImgUrl
    }
  },
  [SETUSERLOGOUT]: () => {
    return initialState
  }
});

export default userInfo;