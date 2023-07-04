/* 마일스톤 - 기본 */
/**
 * 전체적인 원리 : 요소가 변경되거나 화면비율이 바뀌면, 보여지는 HTML요소가 달라지게
 */
import ContextMenuInCalendar from 'components/modules/Modal/Milestone/ContextMenuInCalendar';
import { RootState } from 'modules/index';
import {
  setBlockByDragAsync,
  setBlockLeftSizeAsync,
  setBlockRightSizeAsync,
} from 'modules/milestoneBlock';
import { setModal } from 'modules/modal';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MILESTONEVAL } from 'utils/milestone';

import { dateTostr, getDateByDiff, isPastDate } from 'utils/time';

import MilestoneBlock from './MilestoneBlock';
import { blockInfoType } from './type';
import { setDayCnt } from 'modules/projectSetting';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

interface Props {
  isColorBlack: boolean;
  setClickDate: React.Dispatch<React.SetStateAction<Date>>;
  setClickBlock: React.Dispatch<
    React.SetStateAction<blockInfoType | undefined>
  >;
}
interface curDateListType {
  date: string;
  cnt: number;
  accCnt: number;
}

interface posType {
  curLeft: number;
  pastLeft: number;
  start: number;
}

const MilestoneBasic = ({
  isColorBlack,
  setClickDate,
  setClickBlock,
}: Props) => {
  const blockInfo = useSelector((state: RootState) => state.milestoneBlock);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const gridRef = useRef<HTMLDivElement>(null);
  const projectId = useParams().projectId as string;

  const [startDay, setStartDay] = useState<Date>(new Date());
  const [monthCnt, setMonthCnt] = useState(2);

  const [curDayList, setCurDayList] = useState<Date[]>([]);
  const [dayPosMap, setDayPosMap] = useState<Map<string, string>>(new Map());
  const [curMonthList, setCurMonthList] = useState<curDateListType[]>([]);
  const [curYearList, setCurYearList] = useState<curDateListType[]>([]);

  //좌우 정렬되게 position값을 정할 수 있게하는 state
  const [pos, setPos] = useState<posType>({
    curLeft: gridRef.current ? gridRef.current.offsetWidth * (3 / 8) : 0,
    pastLeft: gridRef.current ? gridRef.current.offsetWidth * (3 / 8) : 0,
    start: 0,
  });
  const [isDrag, setIsDrag] = useState(false);
  const [isDayUnit, setIsDayUnit] = useState(true);
  const [minMonthLength, setMinMonthLength] = useState(4);

  const [rightClickPos, setRightClickPos] = useState<number[]>([0, 0]);
  const openModal = useSelector((state: RootState) => state.modal);
  const projectSet = useSelector((state: RootState) => state.projectSetting);
console.log(projectSet)
  /* useEffect */
  useEffect(() => {
    setCurDayList(initialDayList());
    handlePos();
  }, [startDay, projectSet.dayCnt]);

  useEffect(() => {
    setCurMonthList(initialCurMonthList());
    setDayPosMap(initialDayPosMap());
  }, [curDayList]);

  useEffect(() => {
    setCurYearList(initialCurYearList());
  }, [curMonthList]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [projectSet.dayCnt]);

  /* useState 초기화 */
  const initialDayList = () => {
    const dayList = [];
    for (
      let i = -(projectSet.dayCnt - 1) / 2;
      i <= (projectSet.dayCnt - 1) / 2;
      i++
    ) {
      dayList.push(getDateByDiff(startDay, i));
    }
    return dayList;
  };

  const initialCurMonthList = () => {
    const months = new Map<string, number>();

    curDayList.forEach((el) => {
      const day = dateTostr(el, 'yyyy-mm');
      months.has(day)
        ? months.set(day, months.get(day)! + 1)
        : months.set(day, 1);
    });

    const res: curDateListType[] = [];
    let sum_el = 1;
    months.forEach((el, key) => {
      res.push({ date: key, cnt: el, accCnt: sum_el });
      sum_el += el;
    });

    setMonthCnt(res.length);
    return res;
  };

  const initialCurYearList = () => {
    const years = new Map<string, number>();

    curMonthList.forEach((el) => {
      const date = el.date.substring(0, 4);
      years.has(date)
        ? years.set(date, years.get(date)! + 1)
        : years.set(date, 1);
    });

    const res: curDateListType[] = [];
    let sum_el = 1;
    years.forEach((el, key) => {
      res.push({ date: key, cnt: el, accCnt: sum_el });
      sum_el += el;
    });

    return res;
  };

  const initialDayPosMap = () => {
    const map = new Map();
    console.log(gridRef.current?.offsetWidth)
    curDayList.forEach((el, idx) => {
      const key = dateTostr(el, 'yyyy-mm-dd');
      const value = gridRef.current
        ? (gridRef.current.offsetWidth / projectSet.dayCnt) * idx
        : 0;
      map.set(key, value);
    });
    return map;
  };

  const handlePos = () => {
    const newPos = gridRef.current ? gridRef.current.offsetWidth * (3 / 8) : 0;

    setPos({ curLeft: newPos, pastLeft: newPos, start: 0 });
  };

  /* 날짜 태그 생성 */
  const makeMainDateTag = (el: curDateListType) => {
    const date = new Date(el.date);

    return (
      <div
        className="grid-item"
        style={{
          gridColumn: `${el.accCnt} / ${el.accCnt + el.cnt}`,
        }}
      >
        {isDayUnit
          ? `${date.getFullYear()} / ${date.getMonth() + 1}`
          : `${date.getFullYear()}`}
      </div>
    );
  };

  const makeSubDateTag = (date: Date, idx: number) => {
    const flg = date === curDayList[curDayList.length - 1] ? true : false;
    return (
      <div
        key={idx}
        className={`grid-item text-area ${flg ? 'no-border' : ''}`}
      >
        {isDayUnit ? date.getDate() : `${date.getMonth() + 1}월`}
      </div>
    );
  };

  const makeEmptyDayTag = (date: Date, idx: number) => {
    if (!date) return;
    return (
      <div
        key={idx}
        className={`empty-area ${dateTostr(date, 'yyyy-mm-dd')}`}
        onContextMenu={() => setClickDate(date)}
      ></div>
    );
  };

  /* 달력 드래그 부분 */
  const handleCalendarMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsDrag(true);
    setPos((pre) => {
      return { ...pre, start: e.clientX };
    });
  };

  const handleCalendarMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isDrag)
      setPos((pre) => {
        return { ...pre, curLeft: pre.pastLeft + pre.start - e.clientX };
      });
  };

  const handleCalendarMouseUp = () => {
    setIsDrag(false);
    if (isDayUnit) {
      const dayWidth =
        gridRef.current!.getElementsByClassName('empty-area')[0].clientWidth;
      const moveDayCnt = Math.round((pos.pastLeft - pos.curLeft) / dayWidth);
      setStartDay(getDateByDiff(startDay, -moveDayCnt));
    } else {
      const monthWidth =
        gridRef.current!.getElementsByClassName('empty-area')[0].clientWidth;
      const moveMonthCnt = Math.round(
        (pos.pastLeft - pos.curLeft) / monthWidth,
      );
      setStartDay(getDateByDiff(startDay, -moveMonthCnt * 30));
    }
  };

  const handleBlockInfo = async (
    id: number,
    leftPos: number,
    topPos: number,
    width: number,
    type: 'drag' | 'leftSize' | 'rightSize',
  ) => {
    switch (type) {
      case 'drag':
        const diff = ~~(
          leftPos /
          (gridRef.current!.offsetWidth / projectSet.dayCnt)
        );
        dispatch(
          setBlockByDragAsync({
            leftPos,
            topPos,
            dayPosMap,
            id,
            diff,
            projectId,
          }),
        );
        break;
      case 'leftSize':
        dispatch(setBlockLeftSizeAsync({ id, leftPos, dayPosMap, projectId }));
        break;
      case 'rightSize':
        dispatch(
          setBlockRightSizeAsync({ id, leftPos, dayPosMap, width, projectId }),
        );
        break;
    }
  };

  /* 스크롤휠 이벤트 */
  const handleWheel = (e: WheelEvent) => {
    const diff = monthCnt;

    const newDayCnt =
      e.deltaY > 0
        ? projectSet.dayCnt > MILESTONEVAL.minDayCnt
          ? projectSet.dayCnt - diff
          : MILESTONEVAL.minDayCnt
        : projectSet.dayCnt + diff;

    if (e.shiftKey && gridRef.current) {
      if (isDayUnit) {
        if (
          gridRef.current.offsetWidth / projectSet.dayCnt <=
          MILESTONEVAL.minDayPx
        ) {
          setMinMonthLength(monthCnt);
          setIsDayUnit(false);
          dispatch(setDayCnt(newDayCnt + 26));
        } else dispatch(setDayCnt(newDayCnt));
      } else {
        if (gridRef.current.offsetWidth / monthCnt <= MILESTONEVAL.minMonthPx) {
          dispatch(setDayCnt(newDayCnt - diff));
          return;
        } else if (monthCnt < minMonthLength) {
          setIsDayUnit(true);
        }
        dispatch(setDayCnt(newDayCnt));
      }
    }
  };

  /* 우클릭 이벤트 */
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setModal('contextMenuInCalendar', 0));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // 클릭 위치 x 좌표
    const y = e.clientY - rect.top; // 클릭 위치 y 좌표
    setRightClickPos([x, y]);
  };

  return (
    <div className="milestone-basic">
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${
            isDayUnit ? projectSet.dayCnt : monthCnt
          },1fr)`,
          gridTemplateRows: '20px 20px ',
          left: `-${pos.curLeft}px`,
        }}
        onMouseDown={handleCalendarMouseDown}
        onMouseMove={handleCalendarMouseMove}
        onMouseUp={handleCalendarMouseUp}
        onDragStart={(e) => {
          e.preventDefault();
        }}
        ref={gridRef}
        onContextMenu={handleContextMenu}
      >


        {/* 무시 */}
        {isDayUnit
          ? curMonthList.map((el, idx) => {
              return makeMainDateTag(el);
            })
          : curYearList.map((el, idx) => {
              return makeMainDateTag(el);
            })}
        {isDayUnit
          ? curDayList.map((el, idx) => {
              return makeSubDateTag(el, idx);
            })
          : curMonthList.map((el, idx) => {
              return makeSubDateTag(new Date(el.date), idx);
            })}
        {isDayUnit
          ? curDayList.map((el, idx) => {
              return makeEmptyDayTag(el, idx);
            })
          : curMonthList.map((el, idx) => {
              return makeEmptyDayTag(new Date(el.date), idx);
            })}
        {/* 무시 */}

        {blockInfo.map((el, idx) => {
          // 여기서 생성된 grid보다 과거의 블럭은 생성 안된다.
          if (
            // end 기준
            isPastDate(new Date(el.end), curDayList[0]) ||
            // start 기준
            isPastDate(curDayList[curDayList.length - 1], new Date(el.start))
          )
            return null;

          const newEl = {
            ...el,
            start: isPastDate(new Date(el.start), curDayList[0])
              ? dateTostr(curDayList[0], 'yyyy-mm-dd')
              : el.start,
            end: isPastDate(new Date(el.end), curDayList[curDayList.length - 1])
              ? el.end
              : dateTostr(curDayList[curDayList.length - 1], 'yyyy-mm-dd'),
          };
          // console.log(newEl, newEl.end, newEl.start)
          // console.log(newEl, curDayList[0])
          return (
            <MilestoneBlock
              block={el}
              startWidth={
                Number(dayPosMap.get(newEl.end)) -
                Number(dayPosMap.get(newEl.start))
              }
              isBlack={isColorBlack}
              dayPos={dayPosMap.get(newEl.start)}
              handleBlockInfo={handleBlockInfo}
              key={idx}
              blockIdx={idx}
              setClickBlock={setClickBlock}
            />
          );
        })}
        {openModal.idx === 0 && openModal.name === 'contextMenuInCalendar' ? (
          <ContextMenuInCalendar
            clientX={rightClickPos[0]}
            clientY={rightClickPos[1]}
          ></ContextMenuInCalendar>
        ) : null}
      </div>
    </div>
  );
};

export default MilestoneBasic;
