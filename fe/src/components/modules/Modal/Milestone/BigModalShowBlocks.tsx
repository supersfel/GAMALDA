import React from 'react';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { blockInfoType } from 'components/milestone/type';
import { useDispatch } from 'react-redux';
import { offModal } from 'modules/modal';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';

import gamaldaIcon from 'assets/png/gamaldaIcon.png';
import { BLOCKCOLOR } from 'utils/utils';
import { ShowBlockInfoType } from 'modules/blockInfo';
import { userInfoType } from 'components/projectSet/type';

interface Props {
  userInfo: userInfoType | undefined;
}

/**
 * 해당 날짜에 존재하는 블럭(일정)들을 보여주는 모달
 * @param param0 block?: blockInfoType, startInitialDate?: Date
 * @returns 해당 날짜에 존재하는 블럭(일정)들을 보여주는 모달
 */
const BigModalShowBlocks = ({userInfo}: Props) => {
  const blockData = useSelector((state: RootState) => state.showBlockInfo);
  const dispatch = useDispatch();

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
  };

  const makeTodoBlock = (data: ShowBlockInfoType) => {
    const manager = userInfo?.userInfos.find(e => e.userId === +data.manager);
    return (
      <div className="todo_block" style={{ background: BLOCKCOLOR[data.bgColor] }}>
        <div className="todo_block_title_area">
          <p className="todo_block_title">{data.title}</p>
        </div>
        <div className="img_area">
          <img
            src={manager ? manager?.profileImage : gamaldaIcon}
            alt="userImg" />
        </div>
      </div>
    )
  }
  return (
    <div className="big-modal-show-blocks" onClick={closeModal}>
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
