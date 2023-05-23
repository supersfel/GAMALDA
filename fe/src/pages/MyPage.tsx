import { verifyUserState } from 'api/login/api';
import Header from 'components/modules/Header/Header'
import MyPageContentArea from 'components/MyPage/MyPageContentArea'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

const MyPage = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['accessToken']);
  useEffect(() => {
    verifyUserState(cookies.accessToken, dispatch);
  }, []);
  return (
    <>
      <div className='mypage'>
        <Header />
        <div>
        </div>
        <MyPageContentArea/>
      </div>
    </>
  )
}

export default MyPage