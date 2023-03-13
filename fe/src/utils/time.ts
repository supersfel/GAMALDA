export const getDateByDiff = (date: Date, diff: number) => {
  const newDate = new Date(date.getTime());
  return new Date(newDate.setDate(date.getDate() + diff));
};

export const getDaysBetweenDates = (date1: Date, date2: Date) => {
  // 날짜 객체를 UTC로 변환하여 timestamp를 계산
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  // 일 단위로 차이 계산
  const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  return days;
};

function leftPad(value: number) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

export const dateTostr = (date: Date, format: 'yyyy-mm' | 'yyyy-mm-dd') => {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());

  return format === 'yyyy-mm'
    ? [year, month].join('-')
    : [year, month, day].join('-');
};
