/* 마엘스톤 페이지 */
import MilestoneBody from 'components/milestone/MilestoneBody';
import MilestoneHeader from 'components/milestone/MilestoneHeader';
import Header from 'components/modules/Header/Header';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const Milestone = () => {
  const projectId = useParams().projectId as string;

  const [viewOpt, setViewOpt] = useState(0);
  const [isColorBlack, setIsColorBlack] = useState(true);

  const socket = io(process.env.REACT_APP_MAIN_URL + '/block');
  useEffect(() => {
    socket.emit('join-room', projectId);
    socket.on('changeBlock', (blockId: string) => console.log(blockId));

    return () => {
      socket.off('changeBlock', (blockId: string) => console.log(blockId));
      socket.emit('leave-room', projectId);
    };
  }, []);

  const test = () => {
    socket.emit('changeBlock', projectId, '3');
  };

  return (
    <div className="milestone-page">
      <Header />
      <button onClick={test} style={{ margin: 100 }}>
        테스트
      </button>
      <MilestoneHeader
        viewOpt={viewOpt}
        setViewOpt={setViewOpt}
        isColorBlack={isColorBlack}
        setIsColorBlack={setIsColorBlack}
      />
      <MilestoneBody viewOpt={viewOpt} isColorBlack={isColorBlack} />
    </div>
  );
};

export default Milestone;
