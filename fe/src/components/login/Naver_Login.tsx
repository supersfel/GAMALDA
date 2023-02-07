import { ReactComponent as GamaldaSVG } from 'assets/svg/gamaldalogo.svg';
import naverLogin from 'assets/png/naver_login.png';

const Nav_Login = () => {
  //  process.env.REACT_APP_NAVER_CLIENT_ID 는 네이버에서 생성된 client ID, process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL 는 네이버에서 설정한 콜백 url이다.
  let naver_api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${encodeURI(process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL!)}&state=${Math.random().toString(36).substr(3, 14)}`;
  return (
    <div className="login_box">
      <div className="title_area flex_center">
        <p className="login_box_title">로그인하고 시작하기</p>
      </div>
      <div className="flex_center">
        <GamaldaSVG width="220px" height="220px"/>
      </div>
      <div className="login_button_area flex_center">
        <button onClick={() =>window.open(naver_api_url,'Naver Login','width=430,height=500,location=no,status=no,scrollbars=yes')}>
          <img className="login_button_img" src={naverLogin} alt="네이버 로그인"/>
        </button>
      </div>
    </div>
  )
}

export default Nav_Login;