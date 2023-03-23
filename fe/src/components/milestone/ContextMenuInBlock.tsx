import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil-02.svg';
import { ReactComponent as TrashSVG } from 'assets/svg/progress_trash.svg';
import { ReactComponent as PlusSVG } from 'assets/svg/plus.svg';

import { COLOR } from 'utils/utils';
import useBackGroundClick from 'hooks/useBackgroundClick';

interface Props {
  isContextMenuOpen: boolean;
  setContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientX: number;
  clientY: number;
}

const ContextMenuInBlock = ({
  isContextMenuOpen,
  setContextMenuOpen,
  clientX,
  clientY,
}: Props) => {
  const ctxMenuRef = useRef(null);
  const [render, setRender] = useState(true);

  //모달 닫기
  useBackGroundClick(ctxMenuRef, setContextMenuOpen);

  useEffect(() => {
    setRender(!render);
    console.log(isContextMenuOpen);
  }, [isContextMenuOpen]);

  return isContextMenuOpen ? (
    <ul
      ref={ctxMenuRef}
      className="contenxt-menu-in-block "
      style={{ left: clientX, top: clientY }}
    >
      <li className="item">
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
  ) : null;
};

export default ContextMenuInBlock;
