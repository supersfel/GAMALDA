import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parse, format } from 'date-fns';

interface CellProps {
  currentMonth: Date;
  selectedDate: Date;
  blockInfo: any;
}

const CalendarCell = ({currentMonth, selectedDate, blockInfo}: CellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const blockDate = blockInfo.map((e:any) => {
    return {
      start: e.start,
      end: e.end
    }
  })

  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    formattedDate = format(day, 'd');
    days.push(
      <div
        className={`cell ${!isSameMonth(day, monthStart) ? 'disabled'
          : isSameDay(day, selectedDate) ? 'today' : (format(currentMonth, 'M') !== format(day, 'M')) ? 'not-valid' : 'valid'}`}
        key={format(currentMonth, 'M') === format(day, 'M') ? currentMonth+formattedDate : formattedDate}
      >
        <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'not_valid_date' : ''}>
          {formattedDate}
        </span>
      </div>,
    );
    day = addDays(day, 1);
  }
  return (
    <>
      {days}
    </>
  );
}

export default CalendarCell;