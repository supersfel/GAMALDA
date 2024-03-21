/* 소개페이지 맨 윗부분 */
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil.svg';
import { ReactComponent as CogSVG } from 'assets/svg/cog.svg';
import { ReactComponent as ManSVG } from 'assets/svg/man_05.svg';
import { ReactComponent as MoonSVG } from 'assets/svg/moon.svg';
import { ReactComponent as PhotoSVG } from 'assets/svg/photo.svg';
import { ReactComponent as NoteBookSVG } from 'assets/svg/notebook.svg';
import {
  checkIsInViewport,
  useWindowScrollEvent,
} from 'hooks/useWindowScrollEvent';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';

const Intro_1 = () => {
  const [animation, setAnimation] = useState(false);
  const notebookRef = useRef<HTMLDivElement>(null);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  //스크롤이 노트북까지 가면 애니메이션 동작
  const handleScrollAnimation = () => {
    setAnimation(
      notebookRef?.current ? checkIsInViewport(notebookRef?.current) : false,
    );
  };
  useWindowScrollEvent(handleScrollAnimation);

  return (
    <div className="intro_1">
      <div className="top">
        <div className="left">
          <div className="title">
            <svg className="intro go" viewBox="0 0 130 60">
              <text
                text-anchor="start"
                x="0"
                y="15"
                className="text text-stroke"
                clip-path="url(#text1)"
              >
                {' '}
                Management
              </text>
              <text
                text-anchor="start"
                x="0"
                y="35"
                className="text text-stroke"
                clip-path="url(#text2)"
              >
                U R LIFE
              </text>
              <text
                text-anchor="start"
                x="0"
                y="55"
                className="text text-stroke"
                clip-path="url(#text3)"
              >
                인생을 가말다
              </text>
              <text
                text-anchor="start"
                x="0"
                y="15"
                className="text text-stroke text-stroke-2"
                clip-path="url(#text1)"
              >
                Management
              </text>
              <text
                text-anchor="start"
                x="0"
                y="35"
                className="text text-stroke text-stroke-2"
                clip-path="url(#text2)"
              >
                U R LIFE
              </text>
              <text
                text-anchor="start"
                x="0"
                y="55"
                className="text text-stroke text-stroke-2"
                clip-path="url(#text3)"
              >
                인생을 가말다
              </text>
              <defs>
                <clipPath id="text1">
                  <text text-anchor="start" x="0" y="15" className="text">
                    Management
                  </text>
                </clipPath>
                <clipPath id="text2">
                  <text text-anchor="start" x="0" y="35" className="text">
                    U R LIFE
                  </text>
                </clipPath>
                <clipPath id="text3">
                  <text text-anchor="start" x="0" y="55" className="text">
                    인생을 가말다
                  </text>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="description">
            <p>
              가말다는 <span>관리하다</span>의 순 우리말로
            </p>
            <p>프로젝트의 일정을 팀원 전체가 실시간으로</p>
            <p>
              관리할 수 있도록 도와주는 <span>마일스톤</span> 제작 사이트 입니다
            </p>
          </div>
          <Link to={userInfo.loginState ? '/mypage' : '/naver_login'}>
            <button className="start-btn btn">시작하기</button>
          </Link>
        </div>
        <div className="right">
          <div className="line">
            <div className="long reverse box">프로젝트 관리</div>
            <div className="non-reverse short box">
              <PencilSVG width="30" />
            </div>
          </div>
          <div className="line">
            <div className="circle reverse box"></div>
            <div className="long non-reverse box">마일스톤 제작</div>
            <div className="circle reverse box"></div>
          </div>
          <div className="line">
            <div className="short non-reverse box">
              <CogSVG width="30" />
            </div>
            <div className="middle reverse box">실시간으로</div>
            <div className="short non-reverse box">
              <ManSVG width="30" />
            </div>
          </div>
          <div className="line">
            <div className="short reverse box">
              <PhotoSVG width="30" />
            </div>
            <div className="long non-reverse box">팀원과 함께</div>
          </div>
          <div className="line">
            <div className="long non-reverse box">직관적인 UI</div>
            <div className="circle reverse box"></div>
            <div className="circle reverse box"></div>
          </div>
          <div className="line">
            <div className="short non-reverse box">with</div>
            <div className="middle reverse box">
              <MoonSVG width="30" />
            </div>
            <div className="short non-reverse box">가말다</div>
          </div>
        </div>
      </div>

      {/* 노트북 부분 */}
      <div className="bottom">
        <div
          className={animation ? 'animation' : 'notebook-non'}
          ref={notebookRef}
        >
          <NoteBookSVG width="500px" />
        </div>
        <div className="description">
          <p>나와 팀의 일정을 한번에</p>
          <p>정리하고 관리하세요</p>
          <p>가말다는 한눈에 들어오는 서비스로</p>
          <p>당신의 퍼포먼스를 높여줄 거에요</p>
        </div>
      </div>
    </div>
  );
};

export default Intro_1;
