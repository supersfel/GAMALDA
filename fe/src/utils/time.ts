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

//a-b , c-d 기간이 곂치는지 판단
export const isOverlap = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date,
): boolean => {
  // start1-end1 기간이 start2-end2 기간보다 늦게 끝나거나, start2-end2 기간이 start1-end1 기간보다 늦게 끝나는 경우가 있을 수 있으므로
  // 두 기간이 겹치는지 여부를 검사한다.
  return start1 < end2 && end1 > start2;
};
