/* 마일스톤 - 달력 */
/**
 * 전체적인 원리 : 요소가 변경되거나 화면비율이 바뀌면, 보여지는 HTML요소가 달라지게
 */
import ContextMenuInCalendar from 'components/modules/Modal/Milestone/ContextMenuInCalendar';
import { RootState } from 'modules/index';
import { setModal } from 'modules/modal';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MILESTONEVAL } from 'utils/milestone';

import { dateTostr, getDateByDiff, isPastDate } from 'utils/time';

import MilestoneBlock from '../MilestoneBlock';
import { blockInfoType } from '../type';
import { setDayCnt } from 'modules/projectSetting';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import CalendarHeader from './CalendarHeader';

import { format, addMonths, subMonths } from 'date-fns';
import CalendarCell from './CalendarCell';

// dark모드 여부
interface Props {
  isColorBlack: boolean;
  setClickDate: React.Dispatch<React.SetStateAction<Date>>;
  setClickBlock: React.Dispatch<
    React.SetStateAction<blockInfoType | undefined>
  >;
}
// 
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

const MilestoneCalendar = ({
  isColorBlack,
  setClickDate,
  setClickBlock,
}: Props) => {
  // block들의 정보
  const blockInfo = useSelector((state: RootState) => state.milestoneBlock);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const gridRef = useRef<HTMLDivElement>(null);
  const projectId = useParams().projectId as string;

  // 블럭 정보 list 배열
  const [blockList, setBlockList] = useState<blockInfoType[][]>([]);

  const [startDay, setStartDay] = useState<Date>(new Date());
  const [monthCnt, setMonthCnt] = useState(2);
  const [curDayList, setCurDayList] = useState<Date[]>([]); //  좌 우로 여유로 생성된 날짜 배열
  const [dayPosMap, setDayPosMap] = useState<Map<string, string>>(new Map()); // 날짜, 요일 배열

  const [curMonthList, setCurMonthList] = useState<curDateListType[]>([]);
  const [curYearList, setCurYearList] = useState<curDateListType[]>([]);

  // 날짜, 요일 관리
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [rightClickPos, setRightClickPos] = useState<number[]>([0, 0]);
  const openModal = useSelector((state: RootState) => state.modal);
  const projectSet = useSelector((state: RootState) => state.projectSetting);

  /* 우클릭 이벤트 */
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setModal('contextMenuInCalendar', 0));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // 클릭 위치 x 좌표
    const y = e.clientY - rect.top; // 클릭 위치 y 좌표
    setRightClickPos([x, y]);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  /**
   * 요일별 문자을 div태그 작업 해줌
   * map메서드의 사용은 요일로 들어가 있는 문자들을 div태그 안에
   * 넣는 작업을 해야하기에 forEach메서드나 for문을 사용하기보다는 map을 사용해
   * 복사한 배열을 작업 후 반환.
   */
  const days = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'].map((e, i) => {
    return (
      <div className="days" key={i}>
        {e}
      </div>
    )
  })

  return (
    <div className="milestone_calendar">
      <div className="calendar_header">
        <CalendarHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
      </div>
      <div className="calendar_day">
        {days}
      </div>
      <div className="calendar_cell" ref={gridRef}>
        <CalendarCell
          currentMonth={currentMonth}
          selectedDate={selectedDate}
        />
        {/* {blockInfo.map((el, idx) => {
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
              setClickBlock={setClickBlock}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default MilestoneCalendar;
