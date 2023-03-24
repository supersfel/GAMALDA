/* 마일스톤 컨트롤하는 부분 */
import { getBlockInfo } from 'api/project/api';
import { RootState } from 'modules/index';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { VIEWOPT } from 'utils/utils';
import MilestoneBasic from './MilestoneBasic';
import { blockInfoType } from './type';

interface Props {
  viewOpt: number;
  isColorBlack: boolean;
}

const MilestoneBody = ({ viewOpt, isColorBlack }: Props) => {
  const projectId = useParams().projectId as string;
  const url = process.env.REACT_APP_API_URL;

  const blockInfoQuery = useQuery({
    queryKey: ['blockInfo', projectId],
    queryFn: async () => {
      const data = await getBlockInfo({ projectId });

      return data;
    },
  });

  const [blockInfo, setBlockInfo] = useState<blockInfoType[]>([]);

  useEffect(() => {
    const socket = io(`${url}/chat`);
  }, []);

  useEffect(() => {
    if (blockInfoQuery.data) setBlockInfo(blockInfoQuery?.data);
  }, [blockInfoQuery.data]);

  return (
    <div className="milestone-body">
      {viewOpt === VIEWOPT.basic ? (
        <MilestoneBasic
          projectId={projectId}
          isColorBlack={isColorBlack}
          blockInfo={blockInfo}
          setBlockInfo={setBlockInfo}
        />
      ) : viewOpt === VIEWOPT.calendar ? (
        <div>캘린더 컴포넌트 들어갈 부분</div>
      ) : (
        <div>요약 컴포넌트 들어갈 부분</div>
      )}
    </div>
  );
};

export default MilestoneBody;
