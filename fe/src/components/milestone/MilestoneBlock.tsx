/* 마일스톤 블록 컴포넌트 */
import React, { useEffect, useState } from 'react';
import { blockInfoType } from './type';
import { BLOCKCOLOR } from 'utils/utils';
import { DICELIST, PROGRESSLIST } from 'utils/milestone';

interface Props {
  block: blockInfoType;
  width: number;
  isBlack: boolean;
  dayPos: string | undefined;
}

const getTopPos = (col: number) => {
  return 40 + col * 32;
};

const MilestoneBlock = ({ block, width, isBlack, dayPos }: Props) => {
  const progressList = isBlack ? PROGRESSLIST[0] : PROGRESSLIST[1];
  const diceList = isBlack ? DICELIST[0] : DICELIST[1];

  const [isBlockDrag, setIsBlockDrag] = useState(false);

  const [leftPos, setLeftPos] = useState(dayPos);
  const [topPos, setTopPos] = useState(getTopPos(block.col));

  useEffect(() => {
    setLeftPos(dayPos);
    setTopPos(getTopPos(block.col));
  }, [dayPos]);

  return (
    <div
      className="milestone-block"
      style={{
        width: width,
        background: BLOCKCOLOR[block.bgColor],
        color: isBlack ? 'black' : 'white',
        left: `${leftPos}px`,
        top: `${topPos}px`,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsBlockDrag(true);
        console.log(e.clientX);
      }}
      onMouseMove={(e) => {
        if (!isBlockDrag) return;
        console.log(e.clientX);
      }}
      onMouseUp={(e) => {
        setIsBlockDrag(false);
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
