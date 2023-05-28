import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parse, format } from 'date-fns';

interface CellProps {
  currentMonth: Date;
  selectedDate: Date;
}

const CalendarCell = ({currentMonth, selectedDate}: CellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let keyNum = 0;
  
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      // const cloneDay = day;
      days.push(
        <div
          className={`cell ${!isSameMonth(day, monthStart) ? 'disabled'
          : isSameDay(day, selectedDate) ? 'today' : (format(currentMonth, 'M') !== format(day, 'M')) ? 'not-valid' : 'valid' }`}
          key={formattedDate}
          // onClick={() => onDateClick(parse(cloneDay))}
        >
          <span className={ format(currentMonth, 'M') !== format(day, 'M') ? 'not_valid_date' : '' }>
            {formattedDate}
          </span>
        </div>,
          );
          day = addDays(day, 1);
      };
      rows.push(
        <div className="row" key={keyNum}>
          {days}
        </div>,
      );
    days = [];
    keyNum++;
  }
  return <div className="cell_body">{rows}</div>;
}

export default CalendarCell;