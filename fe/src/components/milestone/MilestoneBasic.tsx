/* 마일스톤 - 기본 */
import React, { useEffect, useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
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

  /* blockInfo 변경 */
  const getNearDate = (pos: number, dayPosList: Map<string, string>) => {
    let nearDate = '';
    let nearDatePosDiff = 999999;
    dayPosList.forEach((val, key) => {
      const posDiff = Math.abs(pos - Number(val));
      if (posDiff < nearDatePosDiff) {
        nearDatePosDiff = posDiff;
        nearDate = key;
      }
    });
    return nearDate;
  };

  const handleBlockInfo = (
    id: number,
    leftPos: number,
    topPos: number,
    width: number,
    type: 'drag' | 'leftSize' | 'rightSize',
  ) => {
    //드래그
    const makeBlockInfoByDrag = () => {
      const nearStartDate = getNearDate(leftPos, dayPosList);
      const newCol = Math.round(topPos / MILESTONEVAL.height) - 1;

      const newBlockInfo = blockInfo.map((el) => {
        if (el.blockId !== id) return el;
        const dayDiff = getDaysBetweenDates(
          new Date(el.start),
          new Date(nearStartDate),
        );

        const newEnd = getDateByDiff(new Date(el.end), dayDiff);
        console.log(nearStartDate, dateTostr(newEnd, 'yyyy-mm-dd'));
        return {
          ...el,
          start: nearStartDate,
          end: dateTostr(newEnd, 'yyyy-mm-dd'),
          col: newCol < 0 ? 0 : newCol,
        };
      });
      changeCol(newBlockInfo);
      return newBlockInfo;
    };

    //좌측 크기조절
    const makeBlockInfoByLeftSizeChange = () => {
      const nearStartDate = getNearDate(leftPos, dayPosList);
      const newBlockInfo = blockInfo.map((el) => {
        if (el.blockId !== id) return el;
        return {
          ...el,
          start: nearStartDate,
        };
      });
      changeCol(newBlockInfo);
      return newBlockInfo;
    };

    //우측 크기조절
    const makeBlockInfoByRightSizeChange = () => {
      let nearEndDate = getNearDate(leftPos + width, dayPosList);
      const newBlockInfo = blockInfo.map((el) => {
        if (el.blockId !== id) return el;
        return {
          ...el,
          end: nearEndDate,
        };
      });
      changeCol(newBlockInfo);
      return newBlockInfo;
    };

    //겹치는 요소가 있는 경우 col 변경
    const changeCol = (blockInfo: blockInfoType[]) => {
      const curBlockInfo = blockInfo.filter((el) => el.blockId === id)[0];
      const curBlockStart = new Date(curBlockInfo.start);
      const curBlockEnd = new Date(curBlockInfo.end);

      let flg = true;
      while (flg) {
        flg = false;
        for (let i = 0; i < blockInfo.length; i++) {
          const el = blockInfo[i];
          if (el.blockId === id) continue;
          if (curBlockInfo.col !== el.col) continue;
          const startDate = new Date(el.start);
          const endDate = new Date(el.end);

          if (isOverlap(curBlockStart, curBlockEnd, startDate, endDate)) {
            flg = true;
            curBlockInfo.col++;
          }
        }
      }
    };

    switch (type) {
      case 'drag':
        setBlockInfo(makeBlockInfoByDrag());
        break;
      case 'leftSize':
        setBlockInfo(makeBlockInfoByLeftSizeChange());
        break;
      case 'rightSize':
        setBlockInfo(makeBlockInfoByRightSizeChange());
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

        {blockInfo.map((el) => {
          const endDate = isPastDate(
            curDayList[curDayList.length - 1],
            new Date(el.end),
          )
            ? dateTostr(curDayList[curDayList.length - 1], 'yyyy-mm-dd')
            : el.end;
          const startDate = isPastDate(
            curDayList[curDayList.length - 1],
            new Date(el.start),
          )
            ? dateTostr(curDayList[curDayList.length - 1], 'yyyy-mm-dd')
            : el.start;

          console.log('curPos', dayPosList.get(startDate));
          console.log(startDate, endDate);
          return (
            <MilestoneBlock
              block={el}
              startWidth={
                Number(dayPosList.get(endDate)) -
                Number(dayPosList.get(startDate))
              }
              isBlack={isColorBlack}
              dayPos={dayPosList.get(startDate)}
              handleBlockInfo={handleBlockInfo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneBasic;
