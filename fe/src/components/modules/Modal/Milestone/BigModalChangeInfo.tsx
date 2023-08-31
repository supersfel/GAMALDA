import React, { useEffect, useState } from 'react';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { blockInfoType } from 'components/milestone/type';
import { DICELIST, PROGRESSLIST } from 'utils/milestone';
import { BLOCKCOLOR } from 'utils/utils';
import { useDispatch } from 'react-redux';
import { offModal } from 'modules/modal';
import { dateTostr } from 'utils/time';
import { addBlock, changeBlockAsync } from 'modules/milestoneBlock';
import { toast } from 'react-toastify';
import { createBlockApi, updateBlockApi } from 'api/project/api';
import { useParams } from 'react-router-dom';
import { socket } from 'socket/socket';
import { ThunkDispatch } from 'redux-thunk';
import { userInfoType } from 'components/projectSet/type';

interface Props {
  type: 'ADD' | 'EDIT';
  block?: blockInfoType;
  startInitialDate?: Date;
  userInfo: userInfoType | undefined;
}

interface userType {
  userId: number;
  nickname: string;
  profileImage: string;
}

const BigModalChangeInfo = ({
  type,
  block,
  startInitialDate = new Date(),
  userInfo,
}: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const projectId = useParams().projectId as string;

  const [content, setContent] = useState('');
  const initialManager = {
    userId: 0,
    nickname: '',
    profileImage: '',
  };
  const [manager, setManager] = useState<userType>(initialManager);
  const [startDate, setStartDate] = useState(
    type === 'ADD' ? dateTostr(startInitialDate, 'yyyy-mm-dd') : block?.start,
  );
  const [endDate, setEndDate] = useState(
    type === 'ADD' ? dateTostr(startInitialDate, 'yyyy-mm-dd') : block?.end,
  );
  const [progress, setProgress] = useState(0);
  const [importance, setImportance] = useState(0);
  const [color, setColor] = useState(0);
  const [onDropDown, setOnDropDown] = useState(false);

  useEffect(() => {
    if (type === 'ADD' || !block) return;
    const manager = userInfo
      ? userInfo?.userInfos.filter((v) => v.userId === +block.manager)[0]
      : initialManager;
    setContent(block.title);
    setManager(manager);
    setStartDate(block.start);
    setEndDate(block.end);
    setProgress(block.progress);
    setImportance(block.importance);
    setColor(block.bgColor);
  }, [block]);

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
  };

  const blockInfo = (): blockInfoType => {
    const ret =
      type === 'EDIT' && block
        ? {
            ...block,
            title: content,
            manager: manager.userId + '',
            start: startDate ? startDate : dateTostr(new Date(), 'yyyy-mm-dd'),
            end: endDate ? endDate : dateTostr(new Date(), 'yyyy-mm-dd'),
            progress: progress,
            importance: importance,
            bgColor: color,
          }
        : {
            ...block,
            title: content,
            manager: manager.userId + '',
            start: startDate ? startDate : dateTostr(new Date(), 'yyyy-mm-dd'),
            end: endDate ? endDate : dateTostr(new Date(), 'yyyy-mm-dd'),
            progress: progress,
            importance: importance,
            bgColor: color,
            subTitle: [''],
            blockId: 0,
            col: 0,
            projectId: ~~projectId,
          };
    //ADD인 경우에는 API를 통해서 받아오도록 수정해야 함
    return ret;
  };

  const checkFormCorrect = (): boolean => {
    const sd = startDate ? new Date(startDate) : new Date();
    const ed = endDate ? new Date(endDate) : new Date();

    if (ed <= sd) {
      toast.warning('날짜를 제대로 선택해 주세요');
      return false;
    }
    return true;
  };

  const handleEditBlock = async () => {
    if (!checkFormCorrect()) return;

    const newBlock = blockInfo();
    dispatch(offModal());

    const ret = await updateBlockApi(newBlock);
    if (!ret) {
      toast.error('블럭이 수정되지 못했습니다.');
      return;
    }

    dispatch(changeBlockAsync({ newBlock, isSocket: false, projectId }));

    toast.success('블록이 수정되었습니다.');
  };

  const handleAddBlock = async () => {
    if (!checkFormCorrect()) return;
    const newBlock = blockInfo();

    dispatch(offModal());
    const ret = await createBlockApi(newBlock);
    if (!ret) {
      toast.error('블럭이 생성되지 못했습니다.');
      return;
    }
    const newBlockWidthId: blockInfoType = { ...newBlock, blockId: ret };

    socket.emit('addBlock', projectId, newBlockWidthId.blockId);
    dispatch(addBlock({ newBlock: newBlockWidthId }));
    toast.success('블록이 추가되었습니다.');
  };

  //매니저 변경
  const handleManager = (idx: number) => {
    const newManager = userInfo?.userInfos[idx];
    setManager(newManager ? newManager : initialManager);
    setOnDropDown(false);
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="manager">
          <p>담당인원</p>
          <input
            className="border-box"
            type="text"
            readOnly
            placeholder="username"
            value={manager.nickname}
            onClick={() => setOnDropDown(!onDropDown)}
          />
          {onDropDown ? (
            <div className="manager-dropdown">
              {userInfo?.userInfos.map((v, idx) => (
                <div className="userInfo" onClick={() => handleManager(idx)}>
                  <div className="name" key={idx}>
                    {v.nickname}
                  </div>
                  <img src={v.profileImage} alt="" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="date">
          <p>날짜</p>
          <div className="border-box date-box">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p>~</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="progress">
          <p>진척도</p>
          <div className="border-box">
            {PROGRESSLIST[0][progress]}
            <div className="pick-el">
              {PROGRESSLIST[0].map((el, idx) => (
                <div className="progress" onClick={() => setProgress(idx)}>
                  {el}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="importance">
          <p>중요도</p>
          <div className="border-box">
            {DICELIST[0][importance]}
            <div className="pick-el">
              {DICELIST[0].map((el, idx) => (
                <div className="dice" onClick={() => setImportance(idx)}>
                  {el}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="color">
          <p>색깔</p>
          <div className="border-box">
            <div
              className="color-value"
              style={{ background: BLOCKCOLOR[color] }}
            ></div>
            <div className="pick-color">
              {BLOCKCOLOR.map((el, idx) => (
                <div
                  className="color"
                  style={{ backgroundColor: el }}
                  onClick={() => setColor(idx)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {type === 'ADD' ? (
          <div className="btn block-change-btn" onClick={handleAddBlock}>
            추가
          </div>
        ) : (
          <div className="btn block-change-btn" onClick={handleEditBlock}>
            수정
          </div>
        )}
      </form>
    </div>
  );
};

export default BigModalChangeInfo;
