import cs from "classnames";
import { CalendarProps } from ".";
import { Dayjs } from "dayjs";

interface daysType {
  date: Dayjs;
  currentMonth: boolean;
  currentDate: boolean;
}

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

function getAllDays(date: Dayjs) {
  // let daysInMonth = date.daysInMonth();
  const startDate = date.startOf("month");
  const day = startDate.day(); // 本月第一天的星期数

  const daysInfo: Array<daysType> = new Array(6 * 7);

  // 计算本月之前的日期
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
      currentDate: false,
    };
  }

  const currentDate = date.date();
  // 计算本月的日期
  for (let i = day; i < daysInfo.length; i++) {
    const curDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: curDate,
      currentMonth: curDate.month() === date.month(),
      currentDate: curDate.date() === currentDate,
    };
  }

  return daysInfo;
}

function MonthCalendar(props: MonthCalendarProps) {
  const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  const { value, curMonth, dateRender, dateInnerContent, selectHandler } = props;

  function renderDays(days: Array<daysType>) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div
            className={"calendar-month-body-cell " + (item.currentMonth ? "calendar-month-body-cell-current " : "")}
            onClick={() => selectHandler?.(item.date)}
            key={`${i - j}`}>
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={cs(
                    "calendar-month-body-cell-date-value",
                    value.format("YYYYMMDD") === item.date.format("YYYYMMDD")
                      ? "calendar-month-body-cell-date-selected"
                      : ""
                  )}>
                  {item.date.date()}
                </div>
                <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((row, _) => (
      <div className="calendar-month-body-row" key={`row${_}`}>
        {row}
      </div>
    ));
  }

  const allDays = getAllDays(curMonth);

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {week}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {renderDays(allDays)}
      </div>
    </div>
  );
}

export default MonthCalendar;
