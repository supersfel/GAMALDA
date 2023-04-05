import React, { useRef } from 'react';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil-02.svg';
import { ReactComponent as TrashSVG } from 'assets/svg/progress_trash.svg';
import { ReactComponent as PlusSVG } from 'assets/svg/plus.svg';

import { COLOR } from 'utils/utils';
import { offModal, setModal } from 'modules/modal';
import { useDispatch } from 'react-redux';
import useBackGroundClickEvent from 'hooks/useBackGroundClickEvent';
import { setBigModalType } from 'modules/projectSetting';

interface Props {
  clientX: number;
  clientY: number;
}

const ContextMenuInBlock = ({ clientX, clientY }: Props) => {
  const ctxMenuRef = useRef(null);
  const dispatch = useDispatch();

  //모달 닫기
  useBackGroundClickEvent(ctxMenuRef);

  const openBigModal = (e: React.MouseEvent, type: 'ADD' | 'EDIT') => {
    e.preventDefault();
    dispatch(setBigModalType(type));
    dispatch(setModal('bigModalChangeInfo', 0));
  };

  return (
    <ul
      ref={ctxMenuRef}
      className="contenxt-menu-in-block "
      style={{ left: clientX, top: clientY }}
    >
      <li className="item" onMouseDown={(e) => openBigModal(e, 'EDIT')}>
        편집 <PencilSVG stroke={COLOR.main} width={'12px'} height={'12px'} />
      </li>
      <li className="item">
        삭제
        <TrashSVG fill={COLOR.red} width={'1rem'} height={'1rem'} />
      </li>
      <li className="item">
        세부일정 추가 <PlusSVG fill={COLOR.main} />
      </li>
    </ul>
  );
};

export default ContextMenuInBlock;
