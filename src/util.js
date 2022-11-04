import dayjs from "dayjs";

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get("day"); // 화 2
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date);
  }
  // ["10.31", "11.1", ..., "11.30"]
  // ["10.30", "10.31", "11.1", ..., "11.30"]

  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get("day");
  /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
  // ["10.31", "11.1", ..., "11.30", "12.1"]
  // ["10.31", "11.1", ..., "11.30", "12.1", "12.2"]
  // ["10.31", "11.1", ..., "11.30", "12.1", "12.2", "12.3"]
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};
export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month"); // 11.1
  const end = dayjs(now).endOf("month"); // 11.30
  const endDate = dayjs(end).get("date"); // 30

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }
  console.log('columns 11월', columns);

  const filledColumns = fillEmptyColumns(columns, start, end);
  console.log('columns 최종', columns);
  // ["10.31", "11.1", ..., "11.30", "12.1", "12.2", "12.3"]
  return filledColumns;
};
