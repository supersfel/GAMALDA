import React, { useState } from 'react';

interface Props {
  type: 'progress' | 'important' | 'manager';
  isBlack: boolean;
}

const SmallModalChangeInfo = ({ type, isBlack }: Props) => {
  const [targetInfoList, setTargetInfoList] = useState();

  return <div className="small-modal-change-block-info"></div>;
};

export default SmallModalChangeInfo;
