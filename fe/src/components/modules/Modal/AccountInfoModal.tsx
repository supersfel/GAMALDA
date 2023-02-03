import { ReactComponent as HomeSVG } from 'assets/svg/home.svg';
import { ReactComponent as SettingSVG } from 'assets/svg/setting.svg';
import { ReactComponent as LogoutSVG } from 'assets/svg/logout.svg';
import { Link } from 'react-router-dom';

interface UserInfo  {
  accountModalRef?: React.RefObject<HTMLDivElement>;
  userName: string; // 이름은 Header의 Prop으로 받아오는 계정 이름을 이용할 예정
}

//  onClose의 타입은 테스트가 끝나면 알맞는 바꾸도록하자
const AccountInfoModal = ({ userName, accountModalRef }: UserInfo) => {
  return (
    <div ref={accountModalRef} className="modal_info_box">
      <p className="username text">{userName}</p>
      <hr />
        <Link to="mypage" className="info_link_area">
          <HomeSVG stroke="black" />
          <p>마이페이지로 이동</p>
        </Link>
        <Link to="setting" className="info_link_area">
          <SettingSVG stroke="black"/>
          <p>계정 설정</p>
        </Link>
        <Link to="logout" className="info_link_area">
          <LogoutSVG stroke="black" />
          <p>로그아웃</p>
        </Link>
    </div>
  )
}

export default AccountInfoModal;