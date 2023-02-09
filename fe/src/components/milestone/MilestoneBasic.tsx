/* 마일스톤 - 기본 */
import React from 'react';
import { io } from 'socket.io-client';

const url = process.env.REACT_APP_API_URL;

interface Props {
  projectId: string;
}

const MilestoneBasic = ({ projectId }: Props) => {
  const socket = io(`${url}/chat`);

  return (
    <>
      <div>asdfasdf</div>
    </>
  );
};

export default MilestoneBasic;
