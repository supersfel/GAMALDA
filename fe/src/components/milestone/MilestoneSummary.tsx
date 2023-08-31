// 요약 페이지
import { RootState } from 'modules/index';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { blockInfoType, smallModalInfoType } from './type';
import { isPastDate } from 'utils/time';
import { DICELIST, PROGRESSLIST } from 'utils/milestone';
import { BLOCKCOLOR } from 'utils/utils';
import { useDispatch } from 'react-redux';
import { setModal } from 'modules/modal';
import SmallModalChangeInfo from 'components/modules/Modal/Milestone/SmallModalChangeInfo';
import ContextMenuInBlock from 'components/modules/Modal/Milestone/ContextMenuInBlock';
import { changeBlockAsync } from 'modules/milestoneBlock';
import { ThunkDispatch } from 'redux-thunk';
import { useParams } from 'react-router-dom';
import { userInfoType } from 'components/projectSet/type';

interface Props {
  isBlack: boolean;
  setClickBlock: React.Dispatch<
    React.SetStateAction<blockInfoType | undefined>
  >;
  userInfo: userInfoType | undefined;
}

const MilestoneSummary = ({ isBlack, setClickBlock, userInfo }: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const titleInfo = ['시작전', '진행중', '지연중', '완료'];
  const blockInfo = useSelector((state: RootState) => state.milestoneBlock);
  const openModal = useSelector((state: RootState) => state.modal); // 상태조회
  const progressList = isBlack ? PROGRESSLIST[0] : PROGRESSLIST[1];
  const diceList = isBlack ? DICELIST[0] : DICELIST[1];
  const projectId = useParams().projectId as string;
  /* useState */
  const [blockList, setBlockList] = useState<blockInfoType[][]>([]);
  const [rightClickPos, setRightClickPos] = useState<number[]>([0, 0]);
  const [smallModalType, setSmallModalType] =
    useState<smallModalInfoType>('progress');

  //진행 사항 별로 블럭을 나눠주는 함수
  const seperateBlock = (blocks: blockInfoType[]) => {
    const [before, ing, late, complete]: blockInfoType[][] = [[], [], [], []];

    const curDate = new Date();
    blocks.forEach((block) => {
      if (block.progress === 5) return;
      if (block.progress === 4) complete.push(block);
      else if (isPastDate(new Date(block.end), curDate)) late.push(block);
      else if (isPastDate(new Date(block.start), curDate)) ing.push(block);
      else before.push(block);
    });
    return [before, ing, late, complete];
  };

  /* useEffect */
  useEffect(() => {
    setBlockList(seperateBlock(blockInfo));
  }, [blockInfo]);

  /** 블록 우클릭 */
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setModal('contextMenuInBlock', idx));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // 클릭 위치 x 좌표
    const y = e.clientY - rect.top; // 클릭 위치 y 좌표
    setRightClickPos([x, y]);
  };

  /** 정보수정 모달창 관련 로직 (작은거)*/
  const handleIsSmallModalOpen = (
    type: smallModalInfoType,
    blockIdx: number,
  ) => {
    dispatch(setModal('smallModalChangeInfo', blockIdx));
    setSmallModalType(type);
  };

  const handleBlockInfoBySmallModal = (
    block: blockInfoType,
    type: smallModalInfoType,
    idx: number,
  ) => {
    const newBlock =
      type === 'progress'
        ? {
            ...block,
            progress: idx,
          }
        : type === 'manager'
        ? { ...block, manager: userInfo?.userInfos[idx].userId + '' }
        : { ...block, importance: idx };
    //manager 고쳐야함

    if (!newBlock) return;
    dispatch(changeBlockAsync({ newBlock, isSocket: false, projectId }));
  };

  //manager의 이미지를 가져오는 함수
  const getManagerInfo = (block: blockInfoType) => {
    const managerInfo = userInfo
      ? userInfo.userInfos.filter((el) => el.userId === +block.manager)[0]
      : null;
    return managerInfo;
  };

  // 나중에 block 컴포넌트 리팩토링 하면 좋을 듯
  return (
    <div className="milestone-summary">
      {blockList.map((blocks, idx) =>
        blocks.length ? (
          <div className="card-box" key={idx}>
            <div className="title-box">
              <p className="title">{titleInfo[idx]}</p>
              <p className="cnt">{blocks.length}</p>
            </div>
            {blocks.map((block, blockIdx) => (
              <div
                className="milestone-block"
                key={blockIdx}
                style={{
                  background: BLOCKCOLOR[block.bgColor],
                  color: isBlack ? 'black' : 'white',
                }}
              >
                <div
                  className="block"
                  onContextMenu={(e) =>
                    handleContextMenu(e, blockInfo.indexOf(block))
                  }
                >
                  <div className="left">{block.title}</div>
                  <div className="right">
                    <img
                      onClick={() =>
                        handleIsSmallModalOpen(
                          'manager',
                          blockInfo.indexOf(block),
                        )
                      }
                      src={getManagerInfo(block)?.profileImage}
                      alt=""
                    />

                    <div
                      onClick={() =>
                        handleIsSmallModalOpen(
                          'important',
                          blockInfo.indexOf(block),
                        )
                      }
                      className="importance"
                    >
                      {diceList[block.importance]}
                    </div>
                    <div
                      onClick={() =>
                        handleIsSmallModalOpen(
                          'progress',
                          blockInfo.indexOf(block),
                        )
                      }
                      className="progress"
                    >
                      {progressList[block.progress]}
                    </div>
                  </div>
                </div>
                {openModal.idx === blockInfo.indexOf(block) &&
                openModal.name === 'smallModalChangeInfo' ? (
                  <SmallModalChangeInfo
                    type={smallModalType}
                    memberImgList={
                      userInfo
                        ? userInfo.userInfos.map((el) => el.profileImage)
                        : []
                    }
                    handleBlockInfo={handleBlockInfoBySmallModal}
                    block={block}
                  ></SmallModalChangeInfo>
                ) : null}
                {/* 나중에 memberImgList Api 혹은 상위컴포넌트에서 받아오도록 변경해야함 */}

                {openModal.idx === blockInfo.indexOf(block) &&
                openModal.name === 'contextMenuInBlock' ? (
                  <ContextMenuInBlock
                    clientX={rightClickPos[0]}
                    clientY={rightClickPos[1]}
                    setClickBlock={setClickBlock}
                    block={block}
                  ></ContextMenuInBlock>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="card-box">
            {/* 블럭 없을때는 빈 박스만 나오도록 */}
            <div className="title-box">
              <p className="title">{titleInfo[idx]}</p>
              <p className="cnt">{blocks.length}</p>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default MilestoneSummary;
