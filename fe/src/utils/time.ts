export const getDateByDiff = (date: Date, diff: number) => {
  const newDate = new Date(date.getTime());
  return new Date(newDate.setDate(date.getDate() + diff));
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
