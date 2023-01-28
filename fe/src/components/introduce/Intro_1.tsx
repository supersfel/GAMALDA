/* 소개페이지 맨 윗부분 */
import React from 'react';

const Intro_1 = () => {
  return (
    <div className="intro_1">
      <div className="left">
        <div className="title">
          <p>MANAGEMENT</p>
          <p>U R LIFE</p>
          <p>인생을 가말다</p>
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
        <button className="start-btn btn">시작하기</button>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Intro_1;
