import axios from 'axios';
import { setUserLogin } from 'modules/userInfo';
import { Dispatch } from 'redux';

/**
 * 유저 accessToken 삭제하고 메인페이지로 redirect 해주는 로그아웃 api
 */
export async function logout() {
  axios.get(`${process.env.REACT_APP_MAIN_URL}/naver_login/logout`)
    .then((res) => {
      if (res.data === 'cookieDeleted') {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
      }
    })
    .catch((e) => {
      throw e;
  })
}

/**
 * axios로 유저 accessToken 검증하고 받아온 닉네임, 프로필 사진을 redux에 dispatch해줌
 * redirect: boolean 이 true인 경우는 에러 발생시 메이 페이지로 redirect로 가야할 경우
 * @param accessToken 
 * @param dispatch 
 * @param redirect 
 */
export async function verifyUserState(accessToken: string, dispatch: Dispatch, redirect?:boolean) {
  
  axios.post(process.env.REACT_APP_API_URL + '/userverify',
    {
      accessToken: accessToken
    }
  )
    .then((res) => {
      if (res.data) {
        dispatch(setUserLogin(res.data.nickname, res.data.profileImgUrl, true));
        return;
      }
      else {
        if (redirect) {
          alert('에러 error');
          window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
        }
      }
  })
}