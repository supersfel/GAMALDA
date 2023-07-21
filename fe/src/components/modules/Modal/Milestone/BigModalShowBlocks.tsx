import React from 'react';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { blockInfoType } from 'components/milestone/type';
import { useDispatch } from 'react-redux';
import { offModal } from 'modules/modal';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';

import minchoImg from 'assets/testImg/mincho.jpg';
import { BLOCKCOLOR } from 'utils/utils';
import { ShowBlockInfoType } from 'modules/blockInfo';

interface Props {
  block?: blockInfoType;
  startInitialDate?: Date;
}

/**
 * 해당 날짜에 존재하는 블럭(일정)들을 보여주는 모달
 * @param param0 block?: blockInfoType, startInitialDate?: Date
 * @returns 해당 날짜에 존재하는 블럭(일정)들을 보여주는 모달
 */
const BigModalShowBlocks = () => {
  const blockData = useSelector((state: RootState) => state.showBlockInfo)
  const dispatch = useDispatch();

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
  };

  const makeTodoBlock = (data: ShowBlockInfoType) => {
    return (
      <div className="todo_block" style={{ background: BLOCKCOLOR[data.bgColor] }}>
        <div className="todo_block_title_area">
          <p className="todo_block_title">{data.title}</p>
        </div>
        <div className="img_area">
          {/* 여기에는 나중에 추가될 유저 이미지가 나오게 추가 작업 할 예정*/}
          <img src={minchoImg} alt="민초러버" />
        </div>
      </div>
    )
  }
  return (
    <div className="big-modal-show-blocks" onClick={closeModal}>
      {/* 모달에 블럭들의 정보를 표현하는 컴포넌트 작성 */}
      <form className="modal" onClick={(e: any) => e.stopPropagation()}>
        <div className="title_area">
          <div className="title">
            <GamaldaIcon width={50} height={50} />
            <p>일정 보기</p>
          </div>
        </div>
        <div className="contents_area">
          {blockData.map(e => makeTodoBlock(e))}
        </div>
        <div className="close_btn_area">
          <div className="btn block-change-btn" onClick={closeModal}>
            닫기
          </div>
        </div>
      </form>
    </div>
  );
};

export default BigModalShowBlocks;
