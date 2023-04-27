import { ReactComponent as HomeSVG } from 'assets/svg/home.svg';
import { ReactComponent as SettingSVG } from 'assets/svg/setting.svg';
import { ReactComponent as LogoutSVG } from 'assets/svg/logout.svg';

interface UserInfo  {
  userName: string; // 이름은 Header의 Prop으로 받아오는 계정 이름을 이용할 예정
}

//  onClose의 타입은 테스트가 끝나면 알맞는 바꾸도록하자
const AccountInfoModal = ({ userName}: UserInfo) => {
  return (
    <div className="modal_info_box">
      <p className="username text">{userName}</p>
      <hr />
        <a href="mypage" className="info_link_area">
          <HomeSVG stroke="black" />
          <p>마이페이지로 이동</p>
        </a>
        <a href="setting" className="info_link_area">
          <SettingSVG stroke="black"/>
          <p>계정 설정</p>
        </a>
        <a href="naver_login/logout" className="info_link_area">
          <LogoutSVG stroke="black" />
          <p>로그아웃</p>
        </a>
    </div>
  )
}

export default AccountInfoModal;