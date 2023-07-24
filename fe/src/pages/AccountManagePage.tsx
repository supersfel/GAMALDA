import Header from 'components/modules/Header/Header';
import useVerifingUserState from 'hooks/useVerifingUserState';


const AccountManagePage = () => {
    useVerifingUserState(false);
  return (
    <div className='account_manage_page'>
      {/* authorized는 api로 가져오는 유저 정보중 하나로 로그인 됨을 나타내줌 */}
      {/* username와 img도 가져와야한다. */}
      <Header />
    </div>
  );
};

export default AccountManagePage;
