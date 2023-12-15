import { ReactComponent as GamaldaSVG } from 'assets/svg/gamaldalogo.svg';
import naverLogin from 'assets/png/naver_login.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateSnowParticles } from 'hooks/snowAnimation/generateSnowParticles';
import { generateNaverApiUrl } from 'hooks/generateNaverApiUrl';

const Nav_Login = () => {
  const [particles, setParticles] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    generateSnowParticles(setParticles, document);
    // 사용자가 브라우저의 크기를 변경시 변경된 공간에 애니메이션을 나타내기 위해 addEventListener의 resize 추가
    // 마운트 될 때 이벤트 리스너를 더하고, 언마운트 될 때 제거해준다. 
    // 참고 링크 : https://db2dev.tistory.com/entry/React-resize-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%8B%A4%EB%A3%A8%EA%B8%B0
    window.addEventListener('resize', () => {
      generateSnowParticles(setParticles, document);
    });
    return () => {
      // cleanUp
      window.removeEventListener('resize', () => {
        generateSnowParticles(setParticles, document);
      });
    };
  }, [])

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