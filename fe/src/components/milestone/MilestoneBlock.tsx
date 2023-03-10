/* 마일스톤 블록 컴포넌트 */
import React, { useEffect, useState } from 'react';
import { blockInfoType } from './type';
import { BLOCKCOLOR } from 'utils/utils';
import { DICELIST, MILESTONEVAL, PROGRESSLIST } from 'utils/milestone';

interface Props {
  block: blockInfoType;
  width: number;
  isBlack: boolean;
  dayPos: string | undefined;
  handleBlockStart: (id: number, leftPos: number, topPos: number) => void;
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
  width,
  isBlack,
  dayPos,
  handleBlockStart,
}: Props) => {
  const progressList = isBlack ? PROGRESSLIST[0] : PROGRESSLIST[1];
  const diceList = isBlack ? DICELIST[0] : DICELIST[1];

  /* useState 설정 */
  const [isBlockDrag, setIsBlockDrag] = useState(false);
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

  /* useEffect */
  useEffect(() => {
    console.log(dayPos);
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
    window.addEventListener('mousemove', hadnleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', hadnleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [block, isBlockDrag, leftPos, topPos]);

  /* 마우스이벤트 */
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

    handleBlockStart(block.blockId, leftPos.cur, topPos.cur);
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
      onMouseDown={handleMouseDown}
    >
      <div className="left">
        <div className="title">{block.title}</div>
      </div>
      <div className="right">
        <img src="https://picsum.photos/18/18" alt="" />
        <div className="importance">{diceList[block.importance]}</div>
        <div className="progress">{progressList[block.progress]}</div>
      </div>
    </div>
  );
};

export default MilestoneBlock;
