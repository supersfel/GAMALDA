import { ReactComponent as GamaldaSVG } from 'assets/svg/gamaldalogo.svg';
import naverLogin from 'assets/png/naver_login.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SnowParticles} from 'utils/snowAnimation';
import { generateNaverApiUrl } from 'hooks/generateNaverApiUrl';
import useResizedWindowSize from 'hooks/useResizedWindowSize';

const Nav_Login = () => {
  const [particles, setParticles] = useState<Array<JSX.Element>>([]);
  const windowSize = useResizedWindowSize();

  useEffect(() => {
    setParticles([...SnowParticles(windowSize.windowWidth, windowSize.windowHeight)])
  }, [windowSize])

  return (
    <>
      <div className="bg"></div>
      <div className="login_page flex_center">
        <div className="login_box">
          <div className="title_area flex_center">
            <p className="login_box_title">로그인하고 시작하기</p>
          </div>
          <div className="img_area flex_center">
            <GamaldaSVG width="220px" height="220px" />
          </div>
          <div className="login_button_area flex_center">
            <Link to={generateNaverApiUrl()} className="flex_center">
              <img className="login_button_img" src={naverLogin} alt="네이버 로그인" />
            </Link>
          </div>
        </div>
      </div>
      <div className="particles">{particles}</div>
    </>
  )
};

export default Nav_Login;