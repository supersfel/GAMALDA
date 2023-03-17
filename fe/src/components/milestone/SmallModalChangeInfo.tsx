import React, { useEffect, useState } from 'react';
import { DICELIST, MILESTONEVAL, PROGRESSLIST } from 'utils/milestone';

interface Props {
  type: 'progress' | 'important' | 'manager';
  memberImgList: string[];
}

const SmallModalChangeInfo = ({ type, memberImgList }: Props) => {
  const [targetInfoList, setTargetInfoList] = useState<JSX.Element[]>();
  const [userProfiles, setUserProfiles] = useState<string[]>();

  useEffect(() => {
    const target = type === 'progress' ? PROGRESSLIST[0] : DICELIST[0];
    setTargetInfoList(target);
  }, [type]);

  useEffect(() => {
    setUserProfiles(memberImgList);
  }, [memberImgList]);

  return (
    <div className="small-modal-change-block-info">
      {type === 'manager'
        ? !!userProfiles
          ? userProfiles.map((el) => (
              <img src={`${el}`} alt="userProfile"></img>
            ))
          : null
        : targetInfoList?.map((el) => <div className="item">{el}</div>)}
    </div>
  );
};

export default SmallModalChangeInfo;
