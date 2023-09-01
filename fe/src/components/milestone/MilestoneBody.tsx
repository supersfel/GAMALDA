/* 마일스톤 컨트롤하는 부분 */
import {
  getBlockInfo,
  getMemberInfosByUserIdApi,
  getProjectInfoByProjectId,
} from 'api/project/api';
import { RootState } from 'modules/index';
import { setBlock } from 'modules/milestoneBlock';

import Modal from 'components/modules/Modal/ModalPortal';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { VIEWOPT } from 'utils/utils';
import BigModalChangeInfo from '../modules/Modal/Milestone/BigModalChangeInfo';
import MilestoneBasic from './MilestoneBasic';
import { blockInfoType } from './type';
import MilestoneSummary from './MilestoneSummary';
import MilestoneCalendar from './Calendar/MilestoneCalendar';
import BigModalShowBlocks from 'components/modules/Modal/Milestone/BigModalShowBlocks';
import { projInfoType, userInfoType } from 'components/projectSet/type';
import { toast } from 'react-toastify';
import { checkCorrectPerson } from 'utils/milestone';

interface Props {
  viewOpt: number;
  isColorBlack: boolean;
}

const MilestoneBody = ({ viewOpt, isColorBlack }: Props) => {
  const projectId = useParams().projectId as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = useSelector((state: RootState) => state.modal);
  const projSet = useSelector((state: RootState) => state.projectSetting);
  const [projInfo, setProjInfo] = useState<projInfoType>();
  const [userInfo, setUserInfo] = useState<userInfoType>();
  const user = useSelector((state: RootState) => state.userInfo);

  const projInfoQuery = useQuery({
    queryKey: ['projInfo', projectId],
    queryFn: async () => {
      const data = (await getProjectInfoByProjectId(
        +projectId,
      )) as projInfoType;
      return data;
    },
  });

  //유저 정보 가져오기
  const userInfoQuery = useQuery({
    queryKey: ['userInfo', projInfo],
    queryFn: async () => {
      if (!projInfo) return;
      const data = (await getMemberInfosByUserIdApi(
        projInfo.teamMember,
      )) as userInfoType;
      return data;
    },
  });

  useEffect(() => {
    if (userInfoQuery.isError)
      toast.error('유저정보를 불러오는 중 오류가 발생하였습니다');
    else setUserInfo(userInfoQuery.data);
  }, [userInfoQuery.data]);

  //프로젝트 정보 가져오기
  useEffect(() => {
    if (projInfoQuery.isError)
      toast.error('프로젝트를 불러오는 중 오류가 발생했습니다');
    else {
      setProjInfo(projInfoQuery.data);
    }
  }, [projInfoQuery.data]);

  useEffect(() => {
    if (!projInfo) return;
    const flg = checkCorrectPerson(
      projInfo.teamMember.split(','),
      projInfo.isPrivate,
      user.userId,
    );

    if (!flg) {
      toast.warning('프로젝트 접근 권한이 없습니다');
      navigate('/');
    }
  }, [projInfo]);

  const blockInfoQuery = useQuery({
    queryKey: ['blockInfo', projectId],
    queryFn: async () => {
      const data = await getBlockInfo({ projectId });

      return data;
    },
  });

  const [clickDate, setClickDate] = useState(new Date());
  const [clickBlock, setClickBlock] = useState<blockInfoType>();

  useEffect(() => {
    if (!blockInfoQuery.data) return;
    dispatch(setBlock(blockInfoQuery?.data));
  }, [blockInfoQuery.data]);

  return (
    <div className="milestone-body">
      {viewOpt === VIEWOPT.basic ? (
        <MilestoneBasic
          isColorBlack={isColorBlack}
          setClickDate={setClickDate}
          setClickBlock={setClickBlock}
          userInfo={userInfo}
        />
      ) : viewOpt === VIEWOPT.calendar ? (
        <MilestoneCalendar isColorBlack={isColorBlack} />
      ) : (
        <MilestoneSummary
          isBlack={isColorBlack}
          setClickBlock={setClickBlock}
          userInfo={userInfo}
        />
      )}
      {openModal.idx === 0 && openModal.name === 'bigModalChangeInfo' ? (
        <Modal
          children={
            <BigModalChangeInfo
              type={projSet.bigChangeModalType}
              block={clickBlock ? clickBlock : undefined}
              startInitialDate={clickDate}
              userInfo={userInfo}
            />
          }
        ></Modal>
      ) : openModal.idx === 0 && openModal.name === 'showBlockInfo' ? (
        <Modal
          children={
            // 모달에서 보여주는 블럭들의 정보는 store에서 관리
              <BigModalShowBlocks
                userInfo={userInfo}
              />
          }
        />
      ) : null}
    </div>
  );
};

export default MilestoneBody;
