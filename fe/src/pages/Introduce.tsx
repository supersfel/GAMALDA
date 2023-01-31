/*  */
import Intro_1 from 'components/introduce/Intro_1';
import Header from 'components/modules/Header/Header';
import React from 'react';

const Introduce = () => {
  return (
    <>
      {/* authorized는 api로 가져오는 유저 정보중 하나로 로그인 됨을 나타내줌 */}
      <Header authorized={true} />
      <Intro_1 />
      <Intro_1 />
      <Intro_1 />
      
    </>
  );
};

export default Introduce;
