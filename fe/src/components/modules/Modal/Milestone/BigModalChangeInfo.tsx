import React from 'react';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { blockInfoType } from 'components/milestone/type';
import { DICELIST, PROGRESSLIST } from 'utils/milestone';
import { BLOCKCOLOR } from 'utils/utils';
import { useDispatch } from 'react-redux';
import { offModal } from 'modules/modal';

interface Props {
  type: 'ADD' | 'EDIT';
  block?: blockInfoType;
}

const BigModalChangeInfo = ({ type, block }: Props) => {
  const dispatch = useDispatch();

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('in');
    e.stopPropagation();
    console.log('in');
    dispatch(offModal());
  };

  return (
    <div className="big-modal-change-info" onClick={closeModal}>
      <form className="modal" onClick={(e: any) => e.stopPropagation()}>
        <div className="title">
          <GamaldaIcon width={50} height={50} />
          <p>일정 {type === 'ADD' ? '추가' : '수정'}</p>
        </div>
        <div className="content">
          <p>일정 내용</p>
          <input
            className="border-box"
            type="text"
            placeholder="내용을 입력 해주세요"
          />
        </div>
        <div className="manager">
          <p>담당인원</p>
          <input className="border-box" type="text" placeholder="username" />
        </div>
        <div className="date">
          <p>날짜</p>
          <div className="border-box date-box">
            <input type="date" />
            <p>~</p>
            <input type="date" />
          </div>
        </div>
        <div className="progress">
          <p>진척도</p>
          <div className="border-box">
            <input type="text" />
            <div className="pick-el">
              {PROGRESSLIST[0].map((el) => (
                <div className="progress">{el}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="importance">
          <p>중요도</p>
          <div className="border-box">
            <input type="text" />
            <div className="pick-el">
              {DICELIST[0].map((el) => (
                <div className="dice">{el}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="color">
          <p>색깔</p>
          <div className="border-box">
            <div className="pick-color">
              {BLOCKCOLOR.map((el) => (
                <div className="color" style={{ backgroundColor: el }}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="btn block-change-btn">
          {type === 'ADD' ? '추가' : '수정'}
        </div>
      </form>
    </div>
  );
};

export default BigModalChangeInfo;
