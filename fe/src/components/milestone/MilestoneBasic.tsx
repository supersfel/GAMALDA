/* 마일스톤 - 기본 */
import { useWindowSize } from 'hooks/useWindowSize';
import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'typescript';
import { dateTostr, getDateByDiff } from 'utils/time';
import { getCenterElement } from 'utils/utils';

interface Props {
  projectId: string;
}

interface curMonthListType {
  date: string;
  cnt: number;
  accCnt: number;
}

interface posType {
  curLeft: number;
  pastLeft: number;
  start: number;
}

const MilestoneBasic = ({ projectId }: Props) => {
  const vw = useWindowSize();
  const gridRef = useRef<HTMLDivElement>(null);

  const [startDay, setStartDay] = useState<Date>(new Date());
  const [dayCnt, setDayCnt] = useState(80);
  const [maxIdx, setMaxIdx] = useState(10);
  const [curDayList, setCurDayList] = useState<Date[]>([]);
  const [curMonthList, setCurMonthList] = useState<curMonthListType[]>([]);
  const [pos, setPos] = useState<posType>({
    curLeft: gridRef.current ? gridRef.current.offsetWidth / 2 : 0,
    pastLeft: gridRef.current ? gridRef.current.offsetWidth / 2 : 0,
    start: 0,
  });
  const [isDrag, setIsDrag] = useState(false);

  /* useEffect */

  useEffect(() => {
    setCurDayList(initialDayList());
    handlePos();
  }, [startDay]);

  useEffect(() => {
    setCurMonthList(initialCurMonthList());
  }, [curDayList]);

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

    const res: curMonthListType[] = [];
    let sum_el = 1;
    months.forEach((el, key) => {
      res.push({ date: key, cnt: el, accCnt: sum_el });
      sum_el += el;
    });

    return res;
  };

  const handlePos = () => {
    const dayWidth = getCenterElement().offsetWidth;
    const newPos = gridRef.current ? gridRef.current.offsetWidth / 2 : 0;

    setPos({ curLeft: newPos, pastLeft: newPos, start: 0 });
  };

  /* 날짜 태그 생성 */
  const makeMainDateTag = (el: curMonthListType) => {
    return (
      <div
        className="grid-item"
        style={{
          gridColumn: `${el.accCnt} / ${el.accCnt + el.cnt}`,
        }}
      >
        {new Date(el.date).getMonth() + 1}
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
        {date.getDate()}
      </div>
    );
  };

  const makeEmptyDayTag = (date: Date, idx: number) => {
    return (
      <div key={idx} className={`empty-area ${dateTostr(date, 'yyyy-mm-dd')}`}>
        {dateTostr(date, 'yyyy-mm-dd')}
      </div>
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

    const dayWidth = getCenterElement().offsetWidth;
    const moveDayCnt = Math.round((pos.pastLeft - pos.curLeft) / dayWidth);
    console.log(moveDayCnt);

    setStartDay(getDateByDiff(startDay, -moveDayCnt));
  };

  return (
    <div className="milestone-basic">
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${dayCnt},1fr)`,
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
        {curMonthList.map((el, idx) => {
          return makeMainDateTag(el);
        })}
        {curDayList.map((el, idx) => {
          return makeSubDateTag(el, idx);
        })}
        {curDayList.map((el, idx) => {
          return makeEmptyDayTag(el, idx);
        })}
      </div>
    </div>
  );
};

export default MilestoneBasic;
