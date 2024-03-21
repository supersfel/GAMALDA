import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useBackGroundClick from 'hooks/useBackgroundClick';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { ReactComponent as UserIcon } from 'assets/svg/user.svg';
import AccountInfoModal from 'components/modules/Modal/AccountInfoModal';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { useWindowScrollEvent } from 'hooks/useWindowScrollEvent';

interface HeaderType{
  isMainPage: boolean
}

const Header = ({isMainPage}: HeaderType) => {
  const [IsModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const onClickButton = () => {
    setModalOpen(!IsModalOpen);
  };
  const userInfo = useSelector((state: RootState) => state.userInfo);
  useBackGroundClick(modalRef, setModalOpen);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    // 원하는 스크롤 임계값 (예: 10px)
    const scrollThreshold = 10;

    // 현재 스크롤 위치가 임계값보다 크면 스크롤이 되었다고 판단
    const scrolled = window.scrollY > scrollThreshold;

    setIsScrolled(scrolled);
  };

  useWindowScrollEvent(handleScroll);

  return (
    <div className={`nav_header ${isMainPage ? 'main_page' : ''} ${isScrolled ? 'nav_header-scroll' : ''}`}>
      <div className="nav_header_content">
        <Link className="gamalda_icon" to="/">
          <GamaldaIcon width="70px" height="70px" />
        </Link>
        <div className={userInfo.loginState ? 'user_icon' : 'login_link'}>
          {userInfo.loginState ? (
            <div ref={modalRef}>
              {userInfo.profileImgUrl ===
                process.env.REACT_APP_NAVER_DEFAULT_IMG ||
              userInfo.profileImgUrl === '' ? (
                <UserIcon onClick={onClickButton} />
              ) : (
                <img src={userInfo.profileImgUrl} onClick={onClickButton} />
              )}
              {IsModalOpen && <AccountInfoModal userName={userInfo.nickName} />}
            </div>
          ) : (
            <Link to="/naver_login">
              <p>로그인</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
