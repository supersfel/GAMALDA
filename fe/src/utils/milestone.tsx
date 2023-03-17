import React, { useState } from 'react';

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
import { COLOR } from './utils';

export const PROGRESSLIST = Object.freeze([
  [
    <Progress25SVG stroke={COLOR.black} />,
    <Progress50SVG stroke={COLOR.black} />,
    <Progress75SVG stroke={COLOR.black} />,
    <ProgressCheckSVG stroke={COLOR.black} />,
    <ProgressStartSVG stroke={COLOR.black} />,
    <ProgressTrashSVG fill={COLOR.black} />,
  ],
  [
    <Progress25SVG stroke={COLOR.white} />,
    <Progress50SVG stroke={COLOR.white} />,
    <Progress75SVG stroke={COLOR.white} />,
    <ProgressCheckSVG stroke={COLOR.white} />,
    <ProgressStartSVG stroke={COLOR.white} />,
    <ProgressTrashSVG fill={COLOR.white} />,
  ],
]);

export const DICELIST = Object.freeze( [
  [
    <Dice1SVG stroke={COLOR.black} />,
    <Dice2SVG stroke={COLOR.black} />,
    <Dice3SVG stroke={COLOR.black} />,
    <Dice4SVG stroke={COLOR.black} />,
    <Dice5SVG stroke={COLOR.black} />,
    <Dice6SVG stroke={COLOR.black} />,
  ],
  [
    <Dice1SVG stroke={COLOR.white} />,
    <Dice2SVG stroke={COLOR.white} />,
    <Dice3SVG stroke={COLOR.white} />,
    <Dice4SVG stroke={COLOR.white} />,
    <Dice5SVG stroke={COLOR.white} />,
    <Dice6SVG stroke={COLOR.white} />,
  ],
]);

export const MILESTONEVAL = Object.freeze({
  startTopPos: 40,
  height: 36,
  minDayPx : 20,
  minDayCnt : 10,
  minMonthPx : 40,

});
