/* 마엘스톤 페이지 */
import MilestoneBody from 'components/milestone/MilestoneBody';
import MilestoneHeader from 'components/milestone/MilestoneHeader';
import Header from 'components/modules/Header/Header';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Milestone = () => {
  const projectId = useParams().projectId as string;

  const [viewOpt, setViewOpt] = useState(0);
  const [isColorBlack, setIsColorBlack] = useState(true);

  return (
    <>
      <Header authorized={false} userName={'오주현'} />
      {/* <button onClick={test} style={{ margin: 100 }}>
        테스트
      </button> */}
      <MilestoneHeader
        viewOpt={viewOpt}
        setViewOpt={setViewOpt}
        isColorBlack={isColorBlack}
        setIsColorBlack={setIsColorBlack}
      />
      <MilestoneBody viewOpt={viewOpt} />
    </>
  );
};

export default Milestone;
