import { ReactComponent as HomeSVG } from 'assets/svg/home.svg';
import { ReactComponent as SettingSVG } from 'assets/svg/setting.svg';
import { ReactComponent as LogoutSVG } from 'assets/svg/logout.svg';
import { Link } from 'react-router-dom';

interface UserInfo  {
  userName: string; // 이름은 사용자의 로그인한 정보를 redux같은 상태 관리툴로 가져와 부모 컴포넌트에서 전달하려한다.
}

//  onClose의 타입은 테스트가 끝나면 알맞는 바꾸도록하자
const AccountInfoModal = ({ userName}: UserInfo) => {
  return (
    <div className="modal_info_box">
      <p className="username text">{userName}</p>
      <hr />
        <Link to="mypage" className="info_link_area">
          <HomeSVG />
          <p>마이페이지로 이동</p>
        </Link>
        <Link to="setting" className="info_link_area">
          <SettingSVG />
          <p>계정 설정</p>
        </Link>
        <Link to="logout" className="info_link_area">
          <LogoutSVG />
          <p>로그아웃</p>
        </Link>
        {/* <button type="button" onClick={onClose}>닫기</button> */}
      
      
    </div>
  )
}

export default AccountInfoModal;