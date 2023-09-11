import AccountManage from 'components/accountManage/AccountManage';
import Header from 'components/modules/Header/Header';
import useVerifingUserState from 'hooks/useVerifingUserState';


const AccountManagePage = () => {
    useVerifingUserState(false);
  return (
    <div className='account-manage-page-box flex_center'>
      <Header isMainPage={false} />
      <AccountManage />
    </div>
  );
};

export default AccountManagePage;