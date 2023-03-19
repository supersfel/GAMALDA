/* 마일스톤 블록 컴포넌트 */
import React, { useEffect, useRef, useState } from 'react';
import { blockInfoType, handleBlockInfoType, smallModalInfoType } from './type';
import { BLOCKCOLOR } from 'utils/utils';
import { DICELIST, MILESTONEVAL, PROGRESSLIST } from 'utils/milestone';
import useMouseEvent from 'hooks/useMouseEvent';
import SmallModalChangeInfo from './SmallModalChangeInfo';

interface Props {
  block: blockInfoType;
  startWidth: number;
  isBlack: boolean;
  dayPos: string | undefined;
  handleBlockInfo: handleBlockInfoType;
  makeBlockInfoByBlock: (newBlock: blockInfoType | undefined) => void;
}

const getTopPos = (col: number) => {
  return MILESTONEVAL.startTopPos + col * MILESTONEVAL.height;
};

interface posType {
  cur: number;
  past: number;
  start: number;
}

const MilestoneBlock = ({
  block,
  startWidth,
  isBlack,
  dayPos,
  makeBlockInfoByBlock,
  handleBlockInfo,
}: Props) => {
  const progressList = isBlack ? PROGRESSLIST[0] : PROGRESSLIST[1];
  const diceList = isBlack ? DICELIST[0] : DICELIST[1];

  /* useState 설정 */
  const [isBlockDrag, setIsBlockDrag] = useState(false);
  const [isBlockSizeChangeLeft, setIsBlockSizeChangeLeft] = useState(false);
  const [isBlockSizeChangeRight, setIsBlockSizeChangeRight] = useState(false);
  const [leftPos, setLeftPos] = useState<posType>({
    cur: Number(dayPos),
    past: Number(dayPos),
    start: 0,
  });
  const [topPos, setTopPos] = useState<posType>({
    cur: getTopPos(block.col),
    past: getTopPos(block.col),
    start: 0,
  });
  const [width, setWidth] = useState(startWidth);

  //모달관련
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [smallModalType, setSmallModalType] =
    useState<smallModalInfoType>('progress');

  /* useEffect */
  useEffect(() => {
    setLeftPos((pre) => {
      return {
        ...pre,
        cur: Number(dayPos),
        past: Number(dayPos),
      };
    });
    setTopPos((pre) => {
      return { ...pre, cur: getTopPos(block.col), past: getTopPos(block.col) };
    });
  }, [dayPos, block]);

  useEffect(() => {
    setWidth(startWidth);
  }, [startWidth, block]);

  /* 블록 드래그앤 드롭 */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsBlockDrag(true);
    setLeftPos((pre) => {
      return { ...pre, start: e.clientX };
    });
    setTopPos((pre) => {
      return { ...pre, start: e.clientY };
    });
  };

  const hadnleMouseMove = (e: MouseEvent) => {
    if (!isBlockDrag) return;
    setLeftPos((pre) => {
      return { ...pre, cur: pre.past - pre.start + e.clientX };
    });
    setTopPos((pre) => {
      return { ...pre, cur: pre.past - pre.start + e.clientY };
    });
  };

  const handleMouseUp = () => {
    if (!isBlockDrag) return;
    setIsBlockDrag(false);
    setLeftPos((pre) => {
      return { ...pre, past: pre.cur };
    });
    setTopPos((pre) => {
      return { ...pre, past: pre.cur };
    });

    handleBlockInfo(block.blockId, leftPos.cur, topPos.cur, width, 'drag');
  };

  useMouseEvent(hadnleMouseMove, handleMouseUp, [
    block,
    isBlockDrag,
    leftPos,
    topPos,
  ]);

  /* 블록 크기조절  */
  /* 왼쪽 */
  const handleLeftMouseMove = (e: MouseEvent) => {
    if (!isBlockSizeChangeLeft) return;
    setLeftPos((pre) => {
      return { ...pre, cur: pre.past - pre.start + e.clientX };
    });
    const newWidth = startWidth + (leftPos.start - e.clientX);
    setWidth(newWidth);
  };

  const handleLeftMouseUp = () => {
    if (!isBlockSizeChangeLeft) return;
    setIsBlockSizeChangeLeft(false);
    handleBlockInfo(block.blockId, leftPos.cur, topPos.cur, width, 'leftSize');
  };

  const handleLeftMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsBlockSizeChangeLeft(true);
    setLeftPos((pre) => {
      return { ...pre, start: e.clientX };
    });
  };

  useMouseEvent(handleLeftMouseMove, handleLeftMouseUp, [
    block,
    isBlockSizeChangeLeft,
    leftPos,
  ]);

  /*오른쪽 */
  const handleRightMouseMove = (e: MouseEvent) => {
    if (!isBlockSizeChangeRight) return;

    setWidth(startWidth - leftPos.start + e.clientX);
  };

  const handleRightMouseUp = () => {
    if (!isBlockSizeChangeRight) return;
    setIsBlockSizeChangeRight(false);
    handleBlockInfo(block.blockId, leftPos.cur, topPos.cur, width, 'rightSize');
  };

  const handleRightMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsBlockSizeChangeRight(true);
    setLeftPos((pre) => {
      return { ...pre, start: e.clientX };
    });
  };
  useMouseEvent(handleRightMouseMove, handleRightMouseUp, [
    block,
    isBlockSizeChangeRight,
    width,
  ]);

  /* 정보수정 모달창 관련 로직 (작은거)*/
  const handleIsSmallModalOpen = (type: smallModalInfoType) => {
    setSmallModalType(type);
    setIsSmallModalOpen(smallModalType !== type ? true : !isSmallModalOpen);
  };

  const handleBlockInfoBySmallModal = (
    type: smallModalInfoType,
    idx: number,
  ) => {
    switch (type) {
      case 'progress':
        break;
      case 'manager':
      default:
        break;
    }

    const newBlock =
      type === 'progress'
        ? {
            ...block,
            progress: idx,
          }
        : type === 'manager'
        ? { ...block, manager: 'test' }
        : { ...block, importance: idx };
    //manager 고쳐야함
    makeBlockInfoByBlock(newBlock);
  };

  return (
    <div
      className="milestone-block"
      style={{
        width: width,
        background: BLOCKCOLOR[block.bgColor],
        color: isBlack ? 'black' : 'white',
        left: `${leftPos.cur}px`,
        top: `${topPos.cur}px`,
      }}
    >
      <div
        className="handle handle-left"
        onMouseDown={handleLeftMouseDown}
      ></div>
      <div
        className="handle handle-right"
        onMouseDown={handleRightMouseDown}
      ></div>
      <div className="block" onMouseDown={handleMouseDown}>
        <div className="left">
          <div className="title">{block.title}</div>
        </div>
        <div className="right">
          <img
            onClick={() => handleIsSmallModalOpen('manager')}
            src="https://picsum.photos/18/18"
            alt=""
          />
          <div
            onClick={() => handleIsSmallModalOpen('important')}
            className="importance"
          >
            {diceList[block.importance]}
          </div>
          <div
            onClick={() => handleIsSmallModalOpen('progress')}
            className="progress"
          >
            {progressList[block.progress]}
          </div>
        </div>
      </div>
      <SmallModalChangeInfo
        isModalOpen={isSmallModalOpen}
        type={smallModalType}
        memberImgList={[...Array(6)].map((el) => 'https://picsum.photos/20/20')}
        setModalState={setIsSmallModalOpen}
        handleBlockInfo={handleBlockInfoBySmallModal}
      ></SmallModalChangeInfo>
      {/* 나중에 memberImgList Api 혹은 상위컴포넌트에서 받아오도록 변경해야함 */}
    </div>
  );
};

export default MilestoneBlock;
