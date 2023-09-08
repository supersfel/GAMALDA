import { ReactComponent as ArrowLeft } from 'assets/svg/arrow_left.svg';
import { ReactComponent as ArrowRight } from 'assets/svg/arrow_right.svg';
import { format } from 'date-fns';

interface Prop {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }: Prop) => {
  return (
    <div className="header_area">
      <div className="header_contents">
        <ArrowLeft onClick={prevMonth} />
        <span className="text_month">
          {format(currentMonth, 'yy')}
          {`년 `}
          {format(currentMonth, 'M')}
          {`월`}
          {/* 5월 */}
        </span>
        <ArrowRight onClick={nextMonth} />
      </div>
    </div>
  );
};

export default CalendarHeader;
