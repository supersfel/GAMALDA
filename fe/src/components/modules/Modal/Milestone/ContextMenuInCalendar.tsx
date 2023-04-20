import useBackGroundClickEvent from 'hooks/useBackGroundClickEvent';
import { setModal } from 'modules/modal';
import { setBigModalType } from 'modules/projectSetting';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as PlusSVG } from 'assets/svg/plus.svg';
import { COLOR } from 'utils/utils';

interface Props {
  clientX: number;
  clientY: number;
}

const ContextMenuInCalendar = ({ clientX, clientY }: Props) => {
  const ctxMenuRef = useRef(null);
  const dispatch = useDispatch();

  //모달 닫기
  useBackGroundClickEvent(ctxMenuRef);

  const openBigModal = (e: React.MouseEvent) => {
    dispatch(setBigModalType('ADD'));
    dispatch(setModal('bigModalChangeInfo', 0));
  };

  return (
    <div
      ref={ctxMenuRef}
      className="context-menu-in-calendar"
      onClick={openBigModal}
      style={{ left: clientX, top: clientY }}
    >
      추가 <PlusSVG fill={COLOR.main} />
    </div>
  );
};

export default ContextMenuInCalendar;
