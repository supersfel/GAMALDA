import Header from 'components/modules/Header/Header'
import MyPageContentArea from 'components/MyPage/MyPageContentArea'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import useVerifingUserState from 'hooks/useVerifingUserState';

const MyPage = () => {
  useVerifingUserState(true);
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