import AccountManage from 'components/accountManage/AccountManage';
import Header from 'components/modules/Header/Header';
import useVerifingUserState from 'hooks/useVerifingUserState';


const AccountManagePage = () => {
    useVerifingUserState(false);
  return (
    <div className='width80p_flex_page_format flex_center'>
      <Header />
      <AccountManage />
    </div>
  );
};

export default AccountManagePage;