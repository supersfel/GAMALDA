/* 마일스톤 - 기본 */

import React, { useEffect, useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MILESTONEVAL } from 'utils/milestone';

import {
  dateTostr,
  getDateByDiff,
  getDaysBetweenDates,
  isOverlap,
  isPastDate,
} from 'utils/time';

import MilestoneBlock from './MilestoneBlock';
import { blockInfoType } from './type';

interface Props {
  projectId: string;
  isColorBlack: boolean;
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

const MilestoneBasic = ({ projectId, isColorBlack }: Props) => {
  const blockInfo = useSelector((state: RootState) => state.milestoneBlock);
  const dispatch = useDispatch();
  const gridRef = useRef<HTMLDivElement>(null);

  const [startDay, setStartDay] = useState<Date>(new Date());
  const [dayCnt, setDayCnt] = useState<number>(MILESTONEVAL.minDayCnt);
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

  /* useEffect */
  useEffect(() => {
    setCurDayList(initialDayList());
    handlePos();
  }, [startDay, dayCnt]);

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
  }, [dayCnt]);

  /* useState 초기화 */
  const initialDayList = () => {
    const dayList = [];
    for (let i = -(dayCnt - 1) / 2; i <= (dayCnt - 1) / 2; i++) {
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

    curDayList.forEach((el, idx) => {
      const key = dateTostr(el, 'yyyy-mm-dd');
      const value = gridRef.current
        ? (gridRef.current.offsetWidth / dayCnt) * idx
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

  const handleBlockInfo = (
    id: number,
    leftPos: number,
    topPos: number,
    width: number,
    type: 'drag' | 'leftSize' | 'rightSize',
  ) => {
    switch (type) {
      case 'drag':
        const diff = ~~(leftPos / (gridRef.current!.offsetWidth / dayCnt));
        dispatch(setBlockByDrag({ leftPos, topPos, dayPosMap, id, diff }));
        break;
      case 'leftSize':
        dispatch(setBlockLeftSize({ id, leftPos, dayPosMap }));
        break;
      case 'rightSize':
        dispatch(setBlockRightSize({ id, leftPos, dayPosMap, width }));
        break;
    }
  };

  /* 스크롤휠 이벤트 */
  const handleWheel = (e: WheelEvent) => {
    const diff = monthCnt;

    const newDayCnt =
      e.deltaY > 0
        ? dayCnt > MILESTONEVAL.minDayCnt
          ? dayCnt - diff
          : MILESTONEVAL.minDayCnt
        : dayCnt + diff;

    if (e.shiftKey && gridRef.current) {
      if (isDayUnit) {
        if (gridRef.current.offsetWidth / dayCnt <= MILESTONEVAL.minDayPx) {
          setMinMonthLength(monthCnt);
          setIsDayUnit(false);
          setDayCnt(newDayCnt + 26);
        } else setDayCnt(newDayCnt);
      } else {
        if (gridRef.current.offsetWidth / monthCnt <= MILESTONEVAL.minMonthPx) {
          setDayCnt(newDayCnt - diff);
          return;
        } else if (monthCnt < minMonthLength) {
          setIsDayUnit(true);
        }
        setDayCnt(newDayCnt);
      }
    }
  };
  return (
    <div className="milestone-basic">
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${isDayUnit ? dayCnt : monthCnt},1fr)`,
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
      >
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

        {blockInfo.map((el, idx) => {
          if (
            isPastDate(new Date(el.end), curDayList[0]) ||
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneBasic;
