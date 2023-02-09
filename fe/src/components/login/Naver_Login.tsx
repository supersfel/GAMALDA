import { ReactComponent as GamaldaSVG } from 'assets/svg/gamaldalogo.svg';
import naverLogin from 'assets/png/naver_login.png';
import { useEffect, useRef } from 'react';
// import getParticles from 'utils/loginPageSnowAnime';

const Nav_Login = () => {
  //  process.env.REACT_APP_NAVER_CLIENT_ID 는 네이버에서 생성된 client ID, process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL 는 네이버에서 설정한 콜백 url이다.
  let naver_api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${encodeURI(process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL!)}&state=${Math.random().toString(36).substr(3, 14)}`;
  const linkNaverLoginAPI = () => {
    window.open(naver_api_url, 'Naver Login', 'width=430,height=500,location=no,status=no,scrollbars=yes')
  }
  const snowEffetRef = useRef<HTMLDivElement>(null);

  //  로그인 페이지 배경에 눈을 생성해주는 함수
  const getParticles = (particleAreaRef: React.RefObject<HTMLElement>) => {
    const particles = particleAreaRef;
    const border = ["50%", "0%"];
    const colors = ["#FF6B6B", "#FFE66D", "#ffffff"];

    if (particles === null) return;
    var np = document.documentElement.clientWidth / 40;
    for (var i = 0; i < np; i++) {
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.clientHeight;
      var rndw = Math.floor(Math.random() * w) + 1;
      var rndh = Math.floor(Math.random() * h) + 1;
      var widthpt = Math.floor(Math.random() * 8) + 5;
      var opty = Math.floor(Math.random() * 4) + 1;
      var anima = Math.floor(Math.random() * 12) + 8;
      var bdr = Math.floor(Math.random() * 2);
      var color = Math.floor(Math.random() * 3);

      var div = document.createElement("div");
      div.style.position = "absolute";
      div.style.marginLeft = rndw + "px";
      div.style.marginTop = rndh + "px";
      div.style.width = widthpt + "px";
      div.style.height = widthpt + "px";
      div.style.opacity = opty + "";
      div.style.backgroundColor = colors[color];
      div.style.borderRadius = border[bdr];
      div.style.animation = "move " + anima + "s ease-in infinite";
      particles.current!.appendChild(div);
    }
  };
  useEffect(() => {
    getParticles(snowEffetRef);
  }, [])
  return (
    <>
      <div className="bg"></div>
      <div className="login_page flex_center">
        <div className="login_box">
          <div className="title_area flex_center">
            <p className="login_box_title">로그인하고 시작하기</p>
          </div>
          <div className="flex_center">
            <GamaldaSVG width="220px" height="220px" />
          </div>
          <div className="login_button_area flex_center">
            <button onClick={linkNaverLoginAPI}>
              <img className="login_button_img" src={naverLogin} alt="네이버 로그인" />
            </button>
          </div>
        </div>
      </div>
      <div className="particles" ref={snowEffetRef} />
    </>
  )
};

export default Nav_Login;