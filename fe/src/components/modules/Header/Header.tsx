import { forwardRef, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useBackGroundClick from 'hooks/useBackgroundClick';
import {ReactComponent as GamaldaIcon} from 'assets/svg/gamaldaIcon.svg';
import {ReactComponent as UserIcon} from 'assets/svg/user.svg';
import AccountInfoModal from 'components/modules/Modal/AccountInfoModal';

type User = {
  //  authorized는 api로 가져오는 유저 정보중 하나로 로그인 됨을 나타내줌
  // userImg: string;  // 추후에 이미지 url을 보내거나 파일자체를 보낼때 사용
  authorized: boolean;
  userName: string;
}

// AccountInfoModal = forwardRef(AccountInfoModal);

const Header = ({ authorized, userName }: User) => {
  const [IsModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const onClickButton = () => {
    setModalOpen(!IsModalOpen);
  };
  useBackGroundClick(modalRef, setModalOpen);
  return (
    <div className="header">
      <div className="header_content">
        <Link to="/">
          {/* {img==="" ? <GamaldaIcon width='70px' height='70px'/> : 여기에 유저 이미지 나오게끔 하는 컴포넌트 삽입} */}
          <GamaldaIcon width='70px' height='70px' />
        </Link>
        <div className={authorized ? "user_icon" :"login_link"}>
        {/* <div className="login_link"> */}
          {authorized ?
            <div>
              <UserIcon width='25px' height='25px' onClick={onClickButton} />
              {IsModalOpen && <AccountInfoModal accountModalRef={modalRef} userName={userName} />}
            </div>
            :
            <Link to="/">
              <p>로그인</p>
            </Link>
          }
        </div>
      </div>
      
    </div>
  )
};

export default Header;