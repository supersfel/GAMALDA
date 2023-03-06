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
  }, [dayPos]);

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
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsBlockDrag(true);
        setLeftPos((pre) => {
          return { ...pre, start: e.clientX };
        });
        setTopPos((pre) => {
          return { ...pre, start: e.clientY };
        });
      }}
      onMouseMove={(e) => {
        if (!isBlockDrag) return;
        setLeftPos((pre) => {
          return { ...pre, cur: leftPos.past - leftPos.start + e.clientX };
        });
        setTopPos((pre) => {
          return { ...pre, cur: topPos.past - topPos.start + e.clientY };
        });
      }}
      onMouseUp={(e) => {
        setIsBlockDrag(false);
        setLeftPos((pre) => {
          return { ...pre, past: leftPos.cur };
        });
        setTopPos((pre) => {
          return { ...pre, past: topPos.cur };
        });
        handleBlockStart(block.blockId, leftPos.cur, topPos.cur);
      }}
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
