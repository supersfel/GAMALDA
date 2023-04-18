import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useBackGroundClick from 'hooks/useBackgroundClick';
import {ReactComponent as GamaldaIcon} from 'assets/svg/gamaldaIcon.svg';
import {ReactComponent as UserIcon} from 'assets/svg/user.svg';
import AccountInfoModal from 'components/modules/Modal/AccountInfoModal';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';

const Header = () => {
  const [IsModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const onClickButton = () => {
    setModalOpen(!IsModalOpen);
  };
  const userInfo = useSelector((state: RootState) => state.userInfo);
  useBackGroundClick(modalRef, setModalOpen);
  return (
    <div className="nav_header">
      <div className="nav_header_content">
        <Link to="/">
          <GamaldaIcon width='70px' height='70px' />
        </Link>
        <div className={userInfo.loginState ? "user_icon" :"login_link"}>
          {userInfo.loginState ?
            <div ref={modalRef}>
              {userInfo.loginState ? <img src={userInfo.profileImgUrl} onClick={onClickButton} /> : <UserIcon onClick={onClickButton} />}
              {IsModalOpen && <AccountInfoModal userName={userInfo.nickName} />}
            </div>
            :
            <Link to="/naver_login">
              <p>로그인</p>
            </Link>
          }
        </div>              
      </div>
      
    </div>
  )
};

export default Header;