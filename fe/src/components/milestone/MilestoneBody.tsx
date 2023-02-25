/* 마일스톤 컨트롤하는 부분 */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { VIEWOPT } from 'utils/utils';
import MilestoneBasic from './MilestoneBasic';

interface Props {
  viewOpt: number;
  isColorBlack: boolean;
}

const MilestoneBody = ({ viewOpt, isColorBlack }: Props) => {
  const projectId = useParams().projectId as string;
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const socket = io(`${url}/chat`);
  }, []);

  return (
    <div className="milestone-body">
      {viewOpt === VIEWOPT.basic ? (
        <MilestoneBasic projectId={projectId} isColorBlack={isColorBlack} />
      ) : viewOpt === VIEWOPT.calendar ? (
        <div>캘린더 컴포넌트 들어갈 부분</div>
      ) : (
        <div>요약 컴포넌트 들어갈 부분</div>
      )}
    </div>
  );
};

export default MilestoneBody;
