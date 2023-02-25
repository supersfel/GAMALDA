/* 마일스톤 블록 컴포넌트 */
import React from 'react';
import { blockInfoType } from './type';
import { ReactComponent as Dice1SVG } from 'assets/svg/dice_1.svg';
import { ReactComponent as Dice2SVG } from 'assets/svg/dice_2.svg';
import { ReactComponent as Dice3SVG } from 'assets/svg/dice_3.svg';
import { ReactComponent as Dice4SVG } from 'assets/svg/dice_4.svg';
import { ReactComponent as Dice5SVG } from 'assets/svg/dice_5.svg';
import { ReactComponent as Dice6SVG } from 'assets/svg/dice_6.svg';
import { ReactComponent as Progress25SVG } from 'assets/svg/progress_25.svg';
import { ReactComponent as Progress50SVG } from 'assets/svg/progress_50.svg';
import { ReactComponent as Progress75SVG } from 'assets/svg/progress_75.svg';
import { ReactComponent as ProgressCheckSVG } from 'assets/svg/progress_check.svg';
import { ReactComponent as ProgressStartSVG } from 'assets/svg/progress_start.svg';
import { ReactComponent as ProgressTrashSVG } from 'assets/svg/progress_trash.svg';
import { BLOCKCOLOR } from 'utils/utils';

interface Props {
  block: blockInfoType;
  width: number;
  isBlack: boolean;
  dayPos: string | undefined;
}

const MilestoneBlock = ({ block, width, isBlack, dayPos }: Props) => {
  const progressList = [
    <Progress25SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <Progress50SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <Progress75SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <ProgressCheckSVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <ProgressStartSVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <ProgressTrashSVG fill={`${isBlack ? 'black' : 'white'}`} />,
  ];
  const diceList = [
    <Dice1SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <Dice2SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <Dice3SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <Dice4SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <Dice5SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
    <Dice6SVG stroke={`${isBlack ? 'black' : 'white'}`} />,
  ];

  return (
    <div
      className="milestone-block"
      style={{
        width: width,
        background: BLOCKCOLOR[block.bgColor],
        color: isBlack ? 'black' : 'white',
        left: `${dayPos}px`,
        top: `${40 + block.col * 32}px`,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        console.log('mousedown');
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
