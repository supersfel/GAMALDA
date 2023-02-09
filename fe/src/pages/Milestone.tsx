/* 마엘스톤 페이지 */
import { getTest } from 'api/project/api';
import MilestoneBasic from 'components/milestone/MilestoneBasic';
import Header from 'components/modules/Header/Header';
import React from 'react';
import { useParams } from 'react-router-dom';

const Milestone = () => {
  const projectId = useParams().projectId as string;

  // const test = async () => {
  //   const res = await getTest();
  //   console.log(res);
  // };

  return (
    <>
      <Header authorized={false} userName={'오주현'} />
      {/* <button onClick={test} style={{ margin: 100 }}>
        테스트
      </button> */}
      <MilestoneBasic projectId={projectId} />
    </>
  );
};

export default Milestone;
