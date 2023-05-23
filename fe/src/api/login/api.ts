import { setUserLogin } from 'modules/userInfo';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';

/**
 * 유저 accessToken 삭제하고 메인페이지로 redirect 해주는 로그아웃 api
 */
export async function logout() {
  fetch(`${process.env.REACT_APP_API_URL}/naver_login/logout`, {
    method: 'get',
    credentials: 'include'
  })
  const response = await fetch(`${process.env.REACT_APP_API_URL}/naver_login/logout`)
  const isDeleted = await response.json();
  if (isDeleted.state === 'cookieDeleted') {
    window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
  }
  else {
    toast.warning('에러가 발생했습니다. 다시 로그인 해주십시오');
    window.location.href = `${process.env.REACT_APP_MAIN_URL}`
  }
}

/**
 * fetch로 유저 accessToken 검증하고 받아온 닉네임, 프로필 사진을 redux에 dispatch해줌
 * redirect: boolean 이 true인 경우는 에러 발생시 메이 페이지로 redirect로 가야할 경우.
 * credentials: 'include' 설정으로 쿠키를 보낼 수 있게 해준다.
 * @param accessToken 
 * @param dispatch 
 * @param redirect 
 */
export async function verifyUserState(accessToken: string, dispatch: Dispatch, redirect?:boolean) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/userverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      accessToken: accessToken
    }),
  })
  const userInfo = await response.json()
  if (userInfo) {
    dispatch(setUserLogin(userInfo.nickname, userInfo.profileImgUrl, true));
    return;
  }
  else {
    toast.warning('토큰이 만료되었습니다. 다시 로그인 해주십시오');
    if (!redirect) {
      window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
    }
  }
}