import { logoutApi } from 'api/login/api';

/**
 * 유저 로그아웃 로직,
 * accessToken삭제후 메인 페이지로 redirect
 * 에러 발생시 경고창 알림 후 메인 페이지로 redirect
 */
const userLogout = async () => {
  const ret = await logoutApi();
  if (ret === 'cookieDeleted') {
    window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
  }
  else {
    alert('에러가 발생했습니다. 다시 로그인 해주십시오');
    window.location.href = `${process.env.REACT_APP_MAIN_URL}`
  }
}

export default userLogout;