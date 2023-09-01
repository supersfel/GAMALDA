import React, { useState } from 'react';
import { ReactComponent as MoodSVG } from 'assets/svg/projset-mood.svg';
import { ReactComponent as ArrowSVG } from 'assets/svg/projset-arrow.svg';
import { ReactComponent as LockSVG } from 'assets/svg/projset-lock.svg';
import { ReactComponent as MailSVG } from 'assets/svg/projset-mail.svg';
import { ReactComponent as PencilSVG } from 'assets/svg/projset-pencil.svg';
import { ReactComponent as TrashSVG } from 'assets/svg/projset-trash.svg';
import { projInfoType, selectType } from './type';
import gamaldaIcon from 'assets/png/gamaldaIcon.png';

interface Props {
  selectItem: selectType;
  setSelectItem: React.Dispatch<React.SetStateAction<selectType>>;
  projInfo: projInfoType | undefined;
}

const ProjSetSelect = ({ selectItem, setSelectItem, projInfo }: Props) => {
  const [isMouseOver, setMouseOver] = useState(false);
  //6가지 선택메뉴 관련 값
  const selectTypeList: selectType[] = [
    'info',
    'private',
    'code',
    'members',
    'delete',
    'back',
  ];
  const imgList = [
    <MoodSVG className="select-img fill-svg"></MoodSVG>,
    <PencilSVG className="select-img"> </PencilSVG>,
    <LockSVG className="select-img fill-svg"></LockSVG>,
    <MailSVG className="select-img"></MailSVG>,
    <TrashSVG className="select-img"></TrashSVG>,
    <ArrowSVG className="select-img fill-svg"></ArrowSVG>,
  ];
  const contentList = [
    '정보변경',
    '권한변경',
    '초대코드 조회',
    '현재 팀원 목록',
    '프로젝트 삭제',
    '프로젝트 복귀',
  ];

  //event handler
  const clickItem = (name: selectType) => {
    setSelectItem(name);
  };

  const checkIsSelect = (name: selectType) => {
    return !isMouseOver && name === selectItem;
  };

  const mouseOver = () => {
    setMouseOver(true);
  };

  const mouseLeave = () => {
    setMouseOver(false);
  };

  return (
    <div className="project-set-select">
      <div className="proj-info">
        <div className="proj-img">
          {/* 여기 수정 */}
          <img src={projInfo?.img ? projInfo?.img : gamaldaIcon} alt="" />
        </div>
        <div className="proj-text">
          <p className="title">프로젝트 설정</p>
          <p className="name">{projInfo ? projInfo.title : ''}</p>
        </div>
      </div>
      <div className="proj-select">
        {selectTypeList.map((name: selectType, idx) => {
          return (
            <div
              className={`select-item ${checkIsSelect(name) ? 'select' : ''}`}
              onClick={() => clickItem(name)}
              onMouseEnter={mouseOver}
              onMouseLeave={mouseLeave}
            >
              {imgList[idx]}
              <p>{contentList[idx]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjSetSelect;
