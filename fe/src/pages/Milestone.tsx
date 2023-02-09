/* 마엘스톤 페이지 */
import { getTest } from 'api/project/api';
import Header from 'components/modules/Header/Header';
import React from 'react';

const Milestone = () => {
  const test = async () => {
    const res = await getTest();
    console.log(res);
  };

  return (
    <>
      <Header authorized={false} userName={'오주현'} />
      <button onClick={test} style={{ margin: 100 }}>
        테스트
      </button>
    </>
  );
};

export default Milestone;
