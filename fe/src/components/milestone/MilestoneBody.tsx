/* 마일스톤 컨트롤하는 부분 */
import { getBlockInfo } from 'api/project/api';
import { RootState } from 'modules/index';
import { setBlock } from 'modules/milestoneBlock';

import Modal from 'components/modules/Modal/ModalPortal';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { VIEWOPT } from 'utils/utils';
import BigModalChangeInfo from '../modules/Modal/BigModalChangeInfo';
import MilestoneBasic from './MilestoneBasic';
import { blockInfoType } from './type';

interface Props {
  viewOpt: number;
  isColorBlack: boolean;
}

const MilestoneBody = ({ viewOpt, isColorBlack }: Props) => {
  const projectId = useParams().projectId as string;
  const url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const blockInfoQuery = useQuery({
    queryKey: ['blockInfo', projectId],
    queryFn: async () => {
      const data = await getBlockInfo({ projectId });

      return data;
    },
  });

  useEffect(() => {
    const socket = io(`${url}/chat`);
  }, []);

  useEffect(() => {
    if (!blockInfoQuery.data) return;
    dispatch(setBlock(blockInfoQuery?.data));
    console.log(blockInfoQuery?.data);
  }, [blockInfoQuery.data]);

  return (
    <div className="milestone-body">
      {viewOpt === VIEWOPT.basic ? (
        <MilestoneBasic projectId={projectId} isColorBlack={isColorBlack} />
      ) : viewOpt === VIEWOPT.calendar ? (
        <div>캘린더 컴포넌트 들어갈 부분</div>
      ) : (
        <div>요약 컴포넌트 들어갈 부분</div>
      )}
      {/* <Modal children={<BigModalChangeInfo type={'ADD'} />}></Modal> */}
    </div>
  );
};

export default MilestoneBody;
