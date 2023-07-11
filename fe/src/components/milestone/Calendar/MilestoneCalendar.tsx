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

import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
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
  const blockInfo = useSelector((state: RootState) => state.milestoneBlock).map(e =>e)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const gridRef = useRef<HTMLDivElement>(null);
  const projectId = useParams().projectId as string;

  // 블럭 정보 list 배열
  const [blockList, setBlockList] = useState<blockInfoType[]>([]);

  // const [startDay, setStartDay] = useState<Date>(new Date());
  // const [monthCnt, setMonthCnt] = useState(2);

  /**
   * curDayList는 일별로 정리된 배열
   */
  const [curDayList, setCurDayList] = useState<Date[]>([]);
  // const [dayPosMap, setDayPosMap] = useState<Map<string, string>>(new Map()); // 날짜, 요일 배열

  // const [curMonthList, setCurMonthList] = useState<curDateListType[]>([]);
  // const [curYearList, setCurYearList] = useState<curDateListType[]>([]);
  const test = blockInfo.filter((e) => {
  
})
  // 날짜, 요일 관리
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [rightClickPos, setRightClickPos] = useState<number[]>([0, 0]);
  const openModal = useSelector((state: RootState) => state.modal);
  const projectSet = useSelector((state: RootState) => state.projectSetting);

  useEffect(() => {
    setCurDayList(initialCurDayList(currentMonth));
    setBlockList(validProjects(currentMonth, blockInfo));
  }, [currentMonth]);
// console.log(blockList)
  
  /* 우클릭 이벤트 */
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setModal('contextMenuInCalendar', 0));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // 클릭 위치 x 좌표
    const y = e.clientY - rect.top/1.15; // 클릭 위치 y 좌표
    setRightClickPos([x, y]);
  };

  /**
   * 이전 월로 이동할 때 currentMonth를 1 감소
   */
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }
  /**
   * 다음 월로 이동할 때 currentMonth를 1 증가
   */
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  /**
   * 달력에 표시되는 날짜들을 생성해주는 함수
   * @param currentMonth 
   * @returns 해당 달의 달력에 표시되는 날짜 리스트 배열
   */
  const initialCurDayList = (currentMonth: Date) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let days = [];
    let startDay = startDate;
    let formattedDate = '';

    while (startDay <= endDate) {
      formattedDate = format(startDay, 'yy-MM-d');
      days.push(startDay)
      startDay = addDays(startDay, 1);
    }
    return days;
  }

  /**
   * 현제 달력에 표시할 블럭들의 정보 배열을 추려주는 함수
   * @param currentMonth 
   * @param arr 
   * @returns 달력에 표시할 블럭 정보 배열
   */
  const validProjects = (currentMonth: Date, arr: blockInfoType[]) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const test = arr.filter((e) => new Date(e.end) < endDate && new Date(e.start) > startDate)
    return test;
  }
  // console.log(validProjects(currentMonth, blockInfo));

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
  });

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
      <div className="calendar_cell" ref={gridRef} onContextMenu={handleContextMenu}>
        <CalendarCell
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          blockInfos={validProjects(currentMonth, blockInfo)}
        />
      </div>
      {openModal.idx === 0 && openModal.name === 'contextMenuInCalendar' ? (
          <ContextMenuInCalendar
            clientX={rightClickPos[0]}
            clientY={rightClickPos[1]}
          ></ContextMenuInCalendar>
        ) : null}
    </div>
  );
};

export default MilestoneCalendar;
