/* 마일스톤 - 기본 */
import React, { useEffect, useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { dateTostr, getDateByDiff } from 'utils/time';
import MilestoneBlock from './MilestoneBlock';
import { blockInfoType } from './type';

interface Props {
  projectId: string;
  isColorBlack: boolean;
  blockInfo: blockInfoType[];
  setBlockInfo: React.Dispatch<React.SetStateAction<blockInfoType[]>>;
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
  projectId,
  isColorBlack,
  blockInfo,
  setBlockInfo,
}: Props) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const [startDay, setStartDay] = useState<Date>(new Date());
  const [dayCnt, setDayCnt] = useState(40);
  const [monthCnt, setMonthCnt] = useState(2);

  const [maxIdx, setMaxIdx] = useState(10);
  const [curDayList, setCurDayList] = useState<Date[]>([]);
  const [dayPosList, setDayPosList] = useState<Map<string, string>>(new Map());
  const [curMonthList, setCurMonthList] = useState<curDateListType[]>([]);
  const [curYearList, setCurYearList] = useState<curDateListType[]>([]);

  //좌우 정렬되게 position값을 정할 수 있게하는 state
  const [pos, setPos] = useState<posType>({
    curLeft: gridRef.current ? gridRef.current.offsetWidth / 2 : 0,
    pastLeft: gridRef.current ? gridRef.current.offsetWidth / 2 : 0,
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
    setDayPosList(initialDayPosList());
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

  const initialDayPosList = () => {
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
    const newPos = gridRef.current ? gridRef.current.offsetWidth / 2 : 0;

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
        return { ...pre, curLeft: pos.pastLeft + pos.start - e.clientX };
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

  /* 스크롤휠 이벤트 */
  const handleWheel = (e: WheelEvent) => {
    const diff = monthCnt;

    const newDayCnt =
      e.deltaY > 0 ? (dayCnt > 10 ? dayCnt - diff : 10) : dayCnt + diff;

    if (e.shiftKey && gridRef.current) {
      if (isDayUnit) {
        if (gridRef.current.offsetWidth / dayCnt <= 20) {
          setMinMonthLength(monthCnt);
          setIsDayUnit(false);
          setDayCnt(newDayCnt + 26);
        } else setDayCnt(newDayCnt);
      } else {
        if (gridRef.current.offsetWidth / monthCnt <= 40) {
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

        {blockInfo.map((el) => {
          return (
            <MilestoneBlock
              block={el}
              width={
                Number(dayPosList.get(el.end)) -
                Number(dayPosList.get(el.start))
              }
              isBlack={isColorBlack}
              dayPos={dayPosList.get(el.start)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneBasic;
