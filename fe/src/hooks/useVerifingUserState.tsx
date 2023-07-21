import { verifyUserStateApi } from 'api/login/api';
import { setUserLogin } from 'modules/userInfo';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

/**
 * accessToken을 이용해 유저 상태 검증후 받아온 닉네임, 프로필 사진을 redux에 dispatch해줌,
 * redirect?: boolean 이 true인 경우는 에러 발생시 메이 페이지로 redirect로 가야할 경우
 * 이 hook을 page 컴포넌트에서 사용해줘야 Header컴포넌트의 유저 아이콘이 나타난다.
 * @param redirect ?: boolean
 */
const useVerifingUserState = async (redirect?: boolean) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['accessToken']);
  useEffect(() => {
    const verify = async () => {
      const ret = await verifyUserStateApi(cookies.accessToken);
      if (ret) {
        dispatch(setUserLogin(ret.userId, ret.nickname, ret.profileImgUrl, true));
      } else if (redirect) {
        alert('토큰이 만료되었습니다. 다시 로그인 해주십시오');
        window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
      }
    };
    verify();
  }, [cookies, dispatch, redirect]);
}

export default useVerifingUserState;