import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
  format,
} from 'date-fns';
import { setShowBlockInfo, ShowBlockInfoType } from 'modules/blockInfo';
import { useDispatch } from 'react-redux';
import { BLOCKCOLOR } from 'utils/utils';
import { blockInfoType } from '../type';
import { setModal } from 'modules/modal';

interface CellProps {
  currentMonth: Date;
  selectedDate: Date;
  blockInfos: blockInfoType[];
  isBlack: boolean;
}

/**
 * @param CellProps 현재 날짜, 선택된 날짜, 블럭들의 정보
 * @returns 달력 형식으로 짜여진 cell, cell 안에는 블럭들의 정보가 들어있다.
 */
const CalendarCell = ({
  currentMonth,
  selectedDate,
  blockInfos,
  isBlack,
}: CellProps) => {
  const monthStart = startOfMonth(currentMonth); // 해당 월의 시작 일과 요일
  const monthEnd = endOfMonth(monthStart); // 해당 월의 끝 일과 요일
  const startDate = startOfWeek(monthStart); // 달력에 표시되는 시작 일과 요일
  const endDate = endOfWeek(monthEnd); // 달력에 표시되는 끝 일과 요일

  const rows = []; // 해당 월에 보여지는 컴포넌트들의 배열
  let days = []; // 7개의 날짜에 해당하는 컴포넌트를 담는 배열(1주 단위로 나뉨)
  let day = startDate;
  let formattedDate = ''; // 날짜(숫자, 달력에 사용하기 위해 keyNum과는 별도로 생성)
  let keyNum = 0; // 달력 배열에 들어가는 가로줄 컴포넌트의 key값

  const dispatch = useDispatch();
  const openShowBlockInfoModal = async (blockData: ShowBlockInfoType[]) => {
    dispatch(setShowBlockInfo(blockData));
    dispatch(setModal('showBlockInfo', 0));
  };
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const data = blockInfos
        .filter((e) => {
          const startDate = parse(e.start, 'yyyy-MM-dd', new Date());
          const endDate = parse(e.end, 'yyyy-MM-dd', new Date());
          if (startDate <= day && endDate >= day) {
            return e;
          }
        })
        .sort((a, b) => a.col - b.col);

      days.push(
        <div
          className={`cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'today'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={formattedDate}
        >
          <span className="date">{formattedDate}</span>

          <div className="cell_content">
            {data.length > 3 ? (
              // 3개 이상의 블럭이 있는 경우
              <>
                <div className="block_area">
                  {data
                    .slice(0, 3)
                    .sort((a, b) => a.col - b.col)
                    .map((e, i) => {
                      return (
                        <div
                          className="block"
                          style={{ background: BLOCKCOLOR[e.bgColor] }}
                          key={i}
                        >
                          <p className="block_title">
                            {e.title.length > 6
                              ? e.title.slice(0, 5) + '...'
                              : e.title}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div className="more_event_text">
                  <p onClick={() => openShowBlockInfoModal(data)}>
                    More Event +{data.length - 3}
                  </p>
                </div>
              </>
            ) : (
              // 3개 이하의 블럭이 있는 경우
              <>
                <div className="block_area">
                  {data
                    .sort((a, b) => a.col - b.col)
                    .map((e, i) => {
                      return (
                        <div
                          className="block"
                          style={{ background: BLOCKCOLOR[e.bgColor] }}
                          key={i}
                        >
                          <p className="block_title">
                            {e.title.length > 6
                              ? e.title.slice(0, 5) + '...'
                              : e.title}
                          </p>
                        </div>
                      );
                    })}
                </div>
                {data.length !== 0 ? (
                  <div className="see_event_text">
                    <p onClick={() => openShowBlockInfoModal(data)}>
                      See Event
                    </p>
                  </div>
                ) : (
                  <div className="see_event_text"></div>
                )}
              </>
            )}
          </div>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={keyNum}>
        {days}
      </div>,
    );
    days = [];
    keyNum++;
  }
  return (
    <div className="cell_body" key={+currentMonth}>
      {rows}
    </div>
  );
};

export default CalendarCell;
