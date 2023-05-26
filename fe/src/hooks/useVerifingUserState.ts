import { verifyUserStateApi } from 'api/login/api';
import { setUserLogin } from 'modules/userInfo';
import { Dispatch } from 'redux';

/**
 * accessToken을 받아 유저 상태 검증후 받아온 닉네임, 프로필 사진을 redux에 dispatch해줌,
 * redirect?: boolean 이 true인 경우는 에러 발생시 메이 페이지로 redirect로 가야할 경우
 * @param accessToken : string
 * @param dispatch : Dispatch(redux)
 * @param redirect ?: boolean
 */
const verifyUser = async (accessToken: string, dispatch: Dispatch, redirect?: boolean) => {
  const ret = await verifyUserStateApi(accessToken);
  if (ret) {
    dispatch(setUserLogin(ret.nickname, ret.profileImgUrl, true));
    return;
  }
  else if (redirect) {
    alert('토큰이 만료되었습니다. 다시 로그인 해주십시오');
    window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
  }
}

export default verifyUser;