/* 소개페이지 footer */
import React, { useRef } from 'react';
import price from 'assets/png/price.png';
import { ReactComponent as LogoSVG } from 'assets/svg/gamaldalogo.svg';

const Intro_3 = () => {
  return (
    <div className="intro_3">
      <div className="price-area">
        <p>
          가말다의 모든 서비스는 전부 <span>무료</span>입니다.
        </p>
        <img src={price} alt="" />
      </div>

      <div className="logo-area">
        <LogoSVG />
        <p>클릭 한번으로 간편하게 시작하세요</p>
        <button className="btn">가말다 시작하기</button>
      </div>

      <div className="footer-area">
        <div className="left">
          <p>가말다</p>
          <div className="question">
            <p>이용문의 : jmg081005@gmail.com</p>
            <p>광고문의 : dhwngus99@gmail.com</p>
          </div>
        </div>

        <div className="right">
          <LogoSVG width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default Intro_3;
