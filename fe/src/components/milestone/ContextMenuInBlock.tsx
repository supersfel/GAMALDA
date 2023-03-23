import React from 'react';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil-02.svg';
import { ReactComponent as TrashSVG } from 'assets/svg/progress_trash.svg';
import { ReactComponent as PlusSVG } from 'assets/svg/plus.svg';

import { COLOR } from 'utils/utils';

const ContextMenuInBlock = () => {
  return (
    <ul className="contenxt-menu-in-block ">
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
  );
};

export default ContextMenuInBlock;
