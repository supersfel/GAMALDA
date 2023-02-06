import { ReactComponent as GamaldaSVG } from 'assets/svg/gamaldalogo.svg';
import naverLogin from 'assets/png/naver_login.png';

const Nav_Login = () => {
  return (
    <div className="login_box">
      <div className="title_area flex_center">
        <p className="login_box_title">로그인하고 시작하기</p>
      </div>
      <div className="flex_center">
        <GamaldaSVG width="220px" height="220px"/>
      </div>
      <div className="login_button_area flex_center">
        <button>
          <img className="login_button_img" src={naverLogin} alt="네이버 로그인"/>
        </button>
        
      </div>
    </div>
  )
}

export default Nav_Login;