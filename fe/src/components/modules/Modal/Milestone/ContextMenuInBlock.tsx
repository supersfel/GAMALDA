import React, { useRef } from 'react';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil-02.svg';
import { ReactComponent as TrashSVG } from 'assets/svg/progress_trash.svg';
import { ReactComponent as PlusSVG } from 'assets/svg/plus.svg';

import { COLOR } from 'utils/utils';
import { offModal, setModal } from 'modules/modal';
import { useDispatch } from 'react-redux';
import useBackGroundClickEvent from 'hooks/useBackGroundClickEvent';
import { setBigModalType } from 'modules/projectSetting';
import { blockInfoType, deleteBlock } from 'modules/milestoneBlock';
import { toast } from 'react-toastify';
import { deleteBlockApi } from 'api/project/api';
import { socket } from 'socket/socket';
import { useParams } from 'react-router-dom';

interface Props {
  clientX: number;
  clientY: number;
  setClickBlock: React.Dispatch<
    React.SetStateAction<blockInfoType | undefined>
  >;
  block: blockInfoType;
}

const ContextMenuInBlock = ({
  clientX,
  clientY,
  setClickBlock,
  block,
}: Props) => {
  const ctxMenuRef = useRef(null);
  const dispatch = useDispatch();
  const projectId = useParams().projectId as string;

  //모달 닫기
  useBackGroundClickEvent(ctxMenuRef);

  const openBigModal = (e: React.MouseEvent, type: 'ADD' | 'EDIT') => {
    e.stopPropagation();
    dispatch(setBigModalType(type));
    dispatch(setModal('bigModalChangeInfo', 0));
    setClickBlock(block);
  };

  const handleDeleteBtn = async () => {
    dispatch(offModal());
    dispatch(deleteBlock({ blockId: block.blockId, isSocket: false }));
    toast.success('블록이 삭제되었습니다.');
    socket.emit('deleteBlock', projectId, block.blockId);
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
      <li className="item" onMouseDown={handleDeleteBtn}>
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
