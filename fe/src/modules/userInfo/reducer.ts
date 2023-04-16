import { createReducer } from 'typesafe-actions';
import { SETUSERLOGIN, SETUSERLOGOUT } from './actions';
import { UserState, UserStateAction } from './types';

const initialState: UserState = {
  loginState: false,
  nickName: '',
  profileImgUrl: ''
};


const userInfo = createReducer<UserState, UserStateAction>(initialState, {
  [SETUSERLOGIN]: (state, action) => {
    return {
      loginState: action.payload.loginState,
      nickName: action.payload.nickName,
      profileImgUrl: action.payload.profileImgUrl
    }
  },
  [SETUSERLOGOUT]: (state, action) => {
    return {
      loginState: false,
      nickName: '',
      profileImgUrl: ''
    }
  }
});

export default userInfo;