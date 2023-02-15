/* 마일스톤 - 기본 */
import React, { useEffect, useState } from 'react';
import { Map } from 'typescript';
import { dateTostr, getDateByDiff } from 'utils/time';

interface Props {
  projectId: string;
}

interface curMonthListType {
  date: string;
  cnt: number;
  accCnt: number;
}

const MilestoneBasic = ({ projectId }: Props) => {
  const [midDay, setMidDay] = useState(new Date());
  const [dayCnt, setDayCnt] = useState(40);
  const [maxIdx, setMaxIdx] = useState(10);
  const [curDayList, setCurDayList] = useState<Date[]>([]);
  const [curMonthList, setCurMonthList] = useState<curMonthListType[]>([]);

  /* useEffect */
  useEffect(() => {
    setCurDayList(makeDayList());
  }, []);

  useEffect(() => {
    setCurMonthList(makeCurMonthList());
  }, [curDayList]);

  /* useState 초기화 */
  const makeDayList = () => {
    const dayList = [];
    for (let i = -(dayCnt - 1) / 2; i <= (dayCnt - 1) / 2; i++) {
      dayList.push(getDateByDiff(midDay, i));
    }
    return dayList;
  };

  const makeCurMonthList = () => {
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

  const makeEmptyDayTag = (idx: number) => {
    return <div key={idx} className="empty-area"></div>;
  };

  return (
    <div className="milestone-basic">
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${dayCnt},1fr)`,
          gridTemplateRows: '20px 20px ',
        }}
      >
        {curMonthList.map((el, idx) => {
          return makeMainDateTag(el);
        })}
        {curDayList.map((el, idx) => {
          return makeSubDateTag(el, idx);
        })}
        {curDayList.map((el, idx) => {
          return makeEmptyDayTag(idx);
        })}
      </div>
    </div>
  );
};

export default MilestoneBasic;
