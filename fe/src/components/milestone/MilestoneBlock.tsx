/* 마일스톤 블록 컴포넌트 */
import React, { useEffect, useRef, useState } from 'react';
import { blockInfoType, handleBlockInfoType, smallModalInfoType } from './type';
import { BLOCKCOLOR } from 'utils/utils';
import { DICELIST, MILESTONEVAL, PROGRESSLIST } from 'utils/milestone';
import useMouseEvent from 'hooks/useMouseEvent';
import SmallModalChangeInfo from 'components/modules/Modal/Milestone/SmallModalChangeInfo';
import ContextMenuInBlock from 'components/modules/Modal/Milestone/ContextMenuInBlock';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { useDispatch } from 'react-redux';
import { setModal } from 'modules/modal';
import { changeBlock, changeBlockAsync } from 'modules/milestoneBlock';
import { EditableTextBlock } from 'components/EditableTextBlock';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { socket } from 'socket/socket';
import { userInfoType } from 'components/projectSet/type';

interface Props {
  block: blockInfoType;
  startWidth: number;
  isBlack: boolean;
  dayPos: string | undefined;
  handleBlockInfo?: handleBlockInfoType;
  blockIdx: number;
  setClickBlock: React.Dispatch<
    React.SetStateAction<blockInfoType | undefined>
  >;
  userInfo: userInfoType | undefined;
}

const getTopPos = (col: number) => {
  return MILESTONEVAL.startTopPos + col * MILESTONEVAL.height;
};

interface posType {
  cur: number;
  past: number;
  start: number;
}

const MilestoneBlock = ({
  block,
  startWidth,
  isBlack,
  dayPos,
  handleBlockInfo,
  blockIdx,
  setClickBlock,
  userInfo,
}: Props) => {
  const progressList = isBlack ? PROGRESSLIST[0] : PROGRESSLIST[1];
  const diceList = isBlack ? DICELIST[0] : DICELIST[1];
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const projectId = useParams().projectId as string;

  /* useState 설정 */
  const [isBlockDrag, setIsBlockDrag] = useState(false);
  const [isBlockSizeChangeLeft, setIsBlockSizeChangeLeft] = useState(false);
  const [isBlockSizeChangeRight, setIsBlockSizeChangeRight] = useState(false);
  const [leftPos, setLeftPos] = useState<posType>({
    cur: Number(dayPos),
    past: Number(dayPos),
    start: 0,
  });
  const [boxState, setBoxState] = useState({
    manager: true,
    importance: true,
    progress: true,
  });

  const [topPos, setTopPos] = useState<posType>({
    cur: getTopPos(block.col),
    past: getTopPos(block.col),
    start: 0,
  });
  const [width, setWidth] = useState(startWidth);
  const [content, setContent] = useState(block.title);
  const [isContentChangeByEdit, setIsContentChangeByEdit] = useState(false);

  //모달관련
  const [smallModalType, setSmallModalType] =
    useState<smallModalInfoType>('progress');
  const [rightClickPos, setRightClickPos] = useState<number[]>([0, 0]);

  const openModal = useSelector((state: RootState) => state.modal); // 상태조회

  /* useEffect */
  useEffect(() => {
    setLeftPos((pre) => {
      return {
        ...pre,
        cur: Number(dayPos),
        past: Number(dayPos),
      };
    });
    setTopPos((pre) => {
      return { ...pre, cur: getTopPos(block.col), past: getTopPos(block.col) };
    });
    setContent(block.title);
  }, [dayPos, block]);

  useEffect(() => {
    setWidth(startWidth);
  }, [startWidth, block]);

  useEffect(handleContentChange, [content]);
  useEffect(handleBoxState, [width]); // 크기에 따라 요소들 보여지는게 달라짐

  /* 제목 클릭해서 변경했을 때 */
  function handleContentChange() {
    if (!isContentChangeByEdit) return;
    const newBlock = { ...block, title: content };
    dispatch(changeBlock({ newBlock, isSocket: false }));
    socket.emit('changeBlock', projectId, newBlock.blockId);
  }

  /* 블록 드래그앤 드롭 */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsBlockDrag(true);
    setLeftPos((pre) => {
      return { ...pre, start: e.clientX };
    });
    setTopPos((pre) => {
      return { ...pre, start: e.clientY };
    });
  };

  const hadnleMouseMove = (e: MouseEvent) => {
    if (!isBlockDrag) return;
    setLeftPos((pre) => {
      return { ...pre, cur: pre.past - pre.start + e.clientX };
    });
    setTopPos((pre) => {
      return { ...pre, cur: pre.past - pre.start + e.clientY };
    });
  };

  const handleMouseUp = () => {
    if (handleBlockInfo) {
      if (!isBlockDrag) return;
      setIsBlockDrag(false);
      setLeftPos((pre) => {
        return { ...pre, past: pre.cur };
      });
      setTopPos((pre) => {
        return { ...pre, past: pre.cur };
      });
      handleBlockInfo(block.blockId, leftPos.cur, topPos.cur, width, 'drag');
    }
  };

  useMouseEvent(hadnleMouseMove, handleMouseUp, [
    block,
    isBlockDrag,
    leftPos,
    topPos,
  ]);

  /* 블록 크기조절  */
  /* 왼쪽 */
  const handleLeftMouseMove = (e: MouseEvent) => {
    if (!isBlockSizeChangeLeft) return;
    setLeftPos((pre) => {
      return { ...pre, cur: pre.past - pre.start + e.clientX };
    });
    const newWidth = startWidth + (leftPos.start - e.clientX);

    setWidth(newWidth);
  };

  const handleLeftMouseUp = () => {
    if (handleBlockInfo) {
      if (!isBlockSizeChangeLeft) return;

      setIsBlockSizeChangeLeft(false);
      handleBlockInfo(
        block.blockId,
        leftPos.cur,
        topPos.cur,
        width,
        'leftSize',
      );
    }
  };

  const handleLeftMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsBlockSizeChangeLeft(true);
    setLeftPos((pre) => {
      return { ...pre, start: e.clientX };
    });
  };

  useMouseEvent(handleLeftMouseMove, handleLeftMouseUp, [
    block,
    isBlockSizeChangeLeft,
    leftPos,
  ]);

  /*오른쪽 */
  const handleRightMouseMove = (e: MouseEvent) => {
    if (!isBlockSizeChangeRight) return;

    setWidth(startWidth - leftPos.start + e.clientX);
  };

  const handleRightMouseUp = () => {
    if (handleBlockInfo) {
      if (!isBlockSizeChangeRight) return;
      setIsBlockSizeChangeRight(false);
      handleBlockInfo(
        block.blockId,
        leftPos.cur,
        topPos.cur,
        width,
        'rightSize',
      );
    }
  };

  const handleRightMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsBlockSizeChangeRight(true);
    setLeftPos((pre) => {
      return { ...pre, start: e.clientX };
    });
  };
  useMouseEvent(handleRightMouseMove, handleRightMouseUp, [
    block,
    isBlockSizeChangeRight,
    width,
  ]);

  /* 정보수정 모달창 관련 로직 (작은거)*/
  const handleIsSmallModalOpen = (type: smallModalInfoType) => {
    dispatch(setModal('smallModalChangeInfo', blockIdx));
    setSmallModalType(type);
  };

  const handleBlockInfoBySmallModal = (
    block: blockInfoType,
    type: smallModalInfoType,
    idx: number,
  ) => {
    const newBlock =
      type === 'progress'
        ? {
            ...block,
            progress: idx,
          }
        : type === 'manager'
        ? { ...block, manager: userInfo?.userInfos[idx].userId + '' }
        : { ...block, importance: idx };

    if (!newBlock) return;
    dispatch(changeBlockAsync({ newBlock, isSocket: false, projectId }));
  };

  /* 블록 우클릭 */

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setModal('contextMenuInBlock', blockIdx));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // 클릭 위치 x 좌표
    const y = e.clientY - rect.top; // 클릭 위치 y 좌표
    setRightClickPos([x, y]);
  };

  //수정 가능한 텍스트 input

  /* 블록 길이에 따라 보여지는 요소들 조정 */
  function handleBoxState() {
    const ret = {
      manager: true,
      importance: true,
      progress: true,
    };
    if (width < 100) ret.progress = false;
    if (width < 80) ret.importance = false;
    if (width < 60) ret.manager = false;

    setBoxState(ret);
  }

  //manager의 이미지를 가져오는 함수
  const getManagerInfo = () => {
    const managerInfo = userInfo
      ? userInfo.userInfos.filter((el) => el.userId === +block.manager)[0]
      : null;
    return managerInfo;
  };

  return (
    <div
      className="milestone-block"
      style={{
        width: `${width}px`,
        background: BLOCKCOLOR[block.bgColor],
        color: isBlack ? 'black' : 'white',
        left: `${leftPos.cur}px`,
        top: `${topPos.cur}px`,
      }}
    >
      <div
        className="handle handle-left"
        onMouseDown={handleLeftMouseDown}
      ></div>
      <div
        className="handle handle-right"
        onMouseDown={handleRightMouseDown}
      ></div>
      <div
        className="block"
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      >
        <div className="left">
          {/* <input
            className="title"
            onDoubleClick={() => toast.success('yes')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          /> */}
          <EditableTextBlock
            content={content}
            setContent={setContent}
            handleContentChange={handleContentChange}
            setIsContentChangeByEdit={setIsContentChangeByEdit}
          ></EditableTextBlock>
        </div>
        <div className="right">
          {boxState.manager ? (
            <img
              onClick={() => handleIsSmallModalOpen('manager')}
              src={getManagerInfo()?.profileImage}
              alt=""
            />
          ) : null}

          {boxState.importance ? (
            <div
              onClick={() => handleIsSmallModalOpen('important')}
              className="importance"
            >
              {diceList[block.importance]}
            </div>
          ) : null}

          {boxState.progress ? (
            <div
              onClick={() => handleIsSmallModalOpen('progress')}
              className="progress"
            >
              {progressList[block.progress]}
            </div>
          ) : null}
        </div>
      </div>
      {openModal.idx === blockIdx &&
      openModal.name === 'smallModalChangeInfo' ? (
        <SmallModalChangeInfo
          type={smallModalType}
          memberImgList={
            userInfo ? userInfo.userInfos.map((el) => el.profileImage) : []
          }
          handleBlockInfo={handleBlockInfoBySmallModal}
          block={block}
        ></SmallModalChangeInfo>
      ) : null}
      {/* 나중에 memberImgList Api 혹은 상위컴포넌트에서 받아오도록 변경해야함 */}

      {openModal.idx === blockIdx && openModal.name === 'contextMenuInBlock' ? (
        <ContextMenuInBlock
          clientX={rightClickPos[0]}
          clientY={rightClickPos[1]}
          setClickBlock={setClickBlock}
          block={block}
        ></ContextMenuInBlock>
      ) : null}
    </div>
  );
};

export default MilestoneBlock;
