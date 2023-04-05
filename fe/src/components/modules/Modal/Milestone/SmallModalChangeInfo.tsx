import useBackGroundClickEvent from 'hooks/useBackGroundClickEvent';
import { offModal } from 'modules/modal';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DICELIST, PROGRESSLIST } from 'utils/milestone';
import { smallModalInfoType } from '../../../milestone/type';

interface Props {
  type: smallModalInfoType;
  memberImgList: string[];
  handleBlockInfo: (type: smallModalInfoType, idx: number) => void;
}

const SmallModalChangeInfo = ({
  type,
  memberImgList,
  handleBlockInfo,
}: Props) => {
  const [targetInfoList, setTargetInfoList] = useState<JSX.Element[]>();
  const [userProfiles, setUserProfiles] = useState<string[]>();

  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // 모달 닫기
  useBackGroundClickEvent(modalRef);

  useEffect(() => {
    const target = type === 'progress' ? PROGRESSLIST[0] : DICELIST[0];
    setTargetInfoList(target);
  }, [type]);

  useEffect(() => {
    setUserProfiles(memberImgList);
  }, [memberImgList]);

  const handleOnClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    handleBlockInfo(type, idx);
    dispatch(offModal());
  };

  return (
    <div ref={modalRef} className="small-modal-change-block-info">
      {type === 'manager'
        ? !!userProfiles
          ? userProfiles.map((el, idx) => (
              <img
                className="item"
                src={`${el}`}
                alt="userProfile"
                onMouseDown={(e) => handleOnClick(e, idx)}
              ></img>
            ))
          : null
        : targetInfoList?.map((el, idx) => (
            <span className="item" onMouseDown={(e) => handleOnClick(e, idx)}>
              {el}
            </span>
          ))}
    </div>
  );
};

export default SmallModalChangeInfo;
