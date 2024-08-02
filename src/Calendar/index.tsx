// import "./index.scss";
import dayjs, { Dayjs } from "dayjs";
import cs from "classnames";
import MonthCalendar from "./MonthCalender";
import Header from "./Header";
import { CSSProperties, ReactNode, useState } from "react";

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { value, style, className, onChange } = props;

  const [curValue, setCurValue] = useState<Dayjs>(value);

  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  const classNames = cs("calendar", className);

  function changeDate(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  function selectHandler(date: Dayjs) {
    changeDate(date);
  }

  function prevMonthHandler() {
    let prevMonth = curMonth.subtract(1, "month");

    setCurMonth(prevMonth);

    // setCurValue(curValue.set("month", prevMonth.month()));
    setCurValue(prevMonth);
  }

  function nextMonthHandler() {
    let nextMonth = curMonth.add(1, "month");

    setCurMonth(nextMonth);

    // setCurValue(curValue.set("month", nextMonth.month()));
    setCurValue(nextMonth);
  }

  function todayHandler() {
    const date = dayjs(Date.now());

    changeDate(date);
  }

  return (
    <div className={classNames} style={style}>
      <Header
        curMonth={curMonth}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
        todayHandler={todayHandler}></Header>
      <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
    </div>
  );
}

export default Calendar;
