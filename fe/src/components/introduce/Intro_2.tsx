/*  */
import React, { useRef, useState } from 'react';
import example_1 from 'assets/png/example_1.png';
import example_2 from 'assets/png/example_2.png';
import example_3 from 'assets/png/example_3.png';
import {
  checkIsInViewport,
  useWindowScrollEvent,
} from 'hooks/useWindowScrollEvent';

const exampleImg = [example_1, example_2, example_3];

const Intro_2 = () => {
  const [animation, setAnimation] = useState(4);
  const imgRef_1 = useRef<HTMLParagraphElement>(null);
  const imgRef_2 = useRef<HTMLParagraphElement>(null);
  const imgRef_3 = useRef<HTMLParagraphElement>(null);
  const imgRef = [imgRef_1, imgRef_2, imgRef_3];

  const fixRef = useRef<HTMLDivElement>(null);

  //스크롤이 노트북까지 가면 애니메이션 동작
  const handleScrollAnimation = () => {
    let tmp = 4;
    for (let i = 0; i < 3; i++) {
      if (checkIsInViewport(imgRef[i]?.current)) {
        tmp = i;
      }
    }
    tmp === 4 ? setAnimation(4) : setAnimation(tmp);

    // console.log(checkIsInViewport(imgRef[0]?.current));
    // console.log(animation);
  };
  useWindowScrollEvent(handleScrollAnimation);

  return (
    <div className="intro_2">
      <div className="top">
        <div className="description-area">
          <div className="text-wrapper">
            <p ref={imgRef_1} className="title">
              <span>팀원</span>들과 함께
            </p>
            <div className="description">
              <p>가말다는 팀원 공동 작업이 가능합니다</p>
              <p>실시간으로 팀원들과 일정을 관리해보세요</p>
            </div>
          </div>

          <div className="text-wrapper">
            <p ref={imgRef_2} className="title">
              보다 <span>손쉽게</span>
            </p>
            <div className="description">
              <p>가말다는 쉬운 조작을 생각합니다</p>
              <p>직관적인 방법으로 마일스톤을 만들어 보세요</p>
            </div>
          </div>
          <div className="text-wrapper">
            <p ref={imgRef_3} className="title">
              <span>왜</span> 가말다인가?
            </p>
            <div className="description">
              <p>직관적인 프로젝트 마일스톤을 원한다면</p>
              <p>가말다가 정답입니다.</p>
            </div>
          </div>
        </div>

        <img
          className={`img-box ${
            animation === 0 ? 'img-animation' : 'img-fadeout'
          }`}
          src={exampleImg[0]}
          alt=""
        />
        <img
          className={`img-box ${
            animation === 1 ? 'img-animation' : 'img-fadeout'
          }`}
          src={exampleImg[1]}
          alt=""
        />
        <img
          className={`img-box ${
            animation === 2 ? 'img-animation' : 'img-fadeout'
          }`}
          src={exampleImg[2]}
          alt=""
        />
      </div>

      <div ref={fixRef} className="bottom">
        <div className="label"></div>
        <div className="label"></div>
        <div className="label"></div>
        <header className="logo">
          <div className="glitch-window"></div>
          <h1 className="glitched">GAMALDA</h1>
          <h1 className="glitched glitch-window">GAMALDA</h1>
        </header>
      </div>
    </div>
  );
};

export default Intro_2;
