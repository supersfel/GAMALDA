import { verifyUserState } from 'api/login/api';
import Header from 'components/modules/Header/Header'
import MyPageContentArea from 'components/MyPage/MyPageContentArea'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { verifyUser } from 'utils/userState';

const MyPage = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['accessToken']);
  useEffect(() => {
    verifyUser(cookies.accessToken, dispatch, true);
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