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
import { VIEWOPT } from 'utils/utils';
import BigModalChangeInfo from '../modules/Modal/Milestone/BigModalChangeInfo';
import MilestoneBasic from './MilestoneBasic';
import { blockInfoType } from './type';
import MilestoneSummary from './MilestoneSummary';
import MilestoneCalendar from './Calendar/MilestoneCalendar';
import BigModalShowBlocks from 'components/modules/Modal/Milestone/BigModalShowBlocks';

interface Props {
  viewOpt: number;
  isColorBlack: boolean;
}

const MilestoneBody = ({ viewOpt, isColorBlack }: Props) => {
  const projectId = useParams().projectId as string;
  const dispatch = useDispatch();

  const openModal = useSelector((state: RootState) => state.modal);
  const projSet = useSelector((state: RootState) => state.projectSetting);

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
        />
      ) : viewOpt === VIEWOPT.calendar ? (
          <MilestoneCalendar
            isColorBlack={isColorBlack}
          />
      ) : (
        <MilestoneSummary
          isBlack={isColorBlack}
          setClickBlock={setClickBlock}
        />
      )}
      {openModal.idx === 0 && openModal.name === 'bigModalChangeInfo' ? (
        <Modal
          children={
            <BigModalChangeInfo
              type={projSet.bigChangeModalType}
              block={clickBlock ? clickBlock : undefined}
              startInitialDate={clickDate}
            />
          }
        ></Modal>
      ) : (
          openModal.idx === 0 && openModal.name === 'showBlockInfo' ? (
            <Modal
              children={
                // 모달에서 보여주는 블럭들의 정보는 store에서 관리
                <BigModalShowBlocks />
              }
            />
          ) : null
      )}
    </div>
  );
};

export default MilestoneBody;
