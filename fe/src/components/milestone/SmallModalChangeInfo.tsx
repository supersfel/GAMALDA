import useBackGroundClick from 'hooks/useBackgroundClick';
import React, { useEffect, useRef, useState } from 'react';
import { DICELIST, MILESTONEVAL, PROGRESSLIST } from 'utils/milestone';
import { smallModalInfoType } from './type';

interface Props {
  type: smallModalInfoType;
  memberImgList: string[];
  isModalOpen: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SmallModalChangeInfo = ({
  type,
  memberImgList,
  isModalOpen,
  setModalState,
}: Props) => {
  const [targetInfoList, setTargetInfoList] = useState<JSX.Element[]>();
  const [userProfiles, setUserProfiles] = useState<string[]>();
  const modalRef = useRef(null);

  //모달 닫기
  useBackGroundClick(modalRef, setModalState);

  useEffect(() => {
    const target = type === 'progress' ? PROGRESSLIST[0] : DICELIST[0];
    setTargetInfoList(target);
  }, [type, isModalOpen]);

  useEffect(() => {
    setUserProfiles(memberImgList);
  }, [memberImgList]);

  return (
    <div
      ref={modalRef}
      style={isModalOpen ? { display: 'grid' } : { display: 'none' }}
      className="small-modal-change-block-info"
    >
      {type === 'manager'
        ? !!userProfiles
          ? userProfiles.map((el, idx) => (
              <img
                src={`${el}`}
                alt="userProfile"
                onClick={() => console.log(idx)}
              ></img>
            ))
          : null
        : targetInfoList?.map((el, idx) => (
            <span className="item" onClick={() => console.log(idx)}>
              {el}
            </span>
          ))}
    </div>
  );
};

export default SmallModalChangeInfo;
