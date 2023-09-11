/* 마엘스톤 페이지 */
import { getOneBlockApi } from 'api/project/api';
import MilestoneBody from 'components/milestone/MilestoneBody';
import MilestoneHeader from 'components/milestone/MilestoneHeader';
import Header from 'components/modules/Header/Header';
import useVerifingUserState from 'hooks/useVerifingUserState';
import {
  addBlock,
  changeBlockAsync,
  deleteBlock,
} from 'modules/milestoneBlock';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { socket } from 'socket/socket';

const Milestone = () => {
  useVerifingUserState();
  const projectId = useParams().projectId as string;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [viewOpt, setViewOpt] = useState(0);
  const [isColorBlack, setIsColorBlack] = useState(true);

  /* 소켓 관련 로직 */
  const handleUpdateBlock = async (blockId: string) => {
    const newBlock = await getOneBlockApi({ blockId: +blockId });

    dispatch(changeBlockAsync({ newBlock, isSocket: true, projectId }));
  };

  const handleAddBlock = async (blockId: string) => {
    const newBlock = await getOneBlockApi({ blockId: +blockId });
    dispatch(addBlock({ newBlock }));
  };

  const handleDeleteBlock = async (blockId: string) => {
    dispatch(deleteBlock({ blockId: +blockId, isSocket: true }));
  };

  useEffect(() => {
    socket.emit('join-room', projectId);
    socket.on('changeBlock', handleUpdateBlock);
    socket.on('addBlock', handleAddBlock);
    socket.on('deleteBlock', handleDeleteBlock);

    return () => {
      socket.off('changeBlock', handleUpdateBlock);
      socket.off('addBlock', handleAddBlock);
      socket.off('deleteBlock', handleDeleteBlock);
      socket.emit('leave-room', projectId);
    };
  }, []);

  return (
    <div className="milestone-page">
      <Header isMainPage={false}  />
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
