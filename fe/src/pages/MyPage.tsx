import Header from 'components/modules/Header/Header'
import MyPageContentArea from 'components/MyPage/MyPageContentArea'
import useVerifingUserState from 'hooks/useVerifingUserState';

const MyPage = () => {
  useVerifingUserState(true);
  return (
    <>
      <div className='mypage'>
        <Header isMainPage={false}  />
        <MyPageContentArea/>
      </div>
    </>
  )
}

export default MyPage