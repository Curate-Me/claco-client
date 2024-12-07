import { useEffect, useState } from "react";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ReactComponent as RightArrow } from "@/assets/svgs/RightArrow.svg";
import { CalendarProps } from "@/types";
import { CalendarDay } from "./CalendarDay";

export const Calendar = ({
  mode = "single",
  selectedDate = null,
  onDateSelect,
  showTimesByDate,
  startYear = new Date().getFullYear(),
  startMonth = new Date().getMonth(),
  rangeStart = null,
  rangeEnd = null,
  onRangeSelect,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(startYear || new Date().getFullYear(), (startMonth || 1) - 1, 1),
  );

  const [internalRangeStart, setInternalRangeStart] = useState<Date | null>(
    rangeStart,
  );
  const [internalRangeEnd, setInternalRangeEnd] = useState<Date | null>(
    rangeEnd,
  );

  const performanceDates = Object.keys(showTimesByDate || "");

  const getYear = () => currentDate.getFullYear();
  const getMonth = () => currentDate.getMonth();

  const startOfMonth = new Date(getYear(), getMonth(), 1);
  const endOfMonth = new Date(getYear(), getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();

  useEffect(() => {
    if (startYear && startMonth) {
      setCurrentDate(new Date(startYear, startMonth, 1));
    }
  }, [startYear, startMonth]);

  useEffect(() => {
    setInternalRangeStart(rangeStart);
    setInternalRangeEnd(rangeEnd);
  }, [rangeStart, rangeEnd]);

  // single mode: 티켓 등록, range mode: 둘러보기
  const handleDateClick = (day: number) => {
    const date = new Date(getYear(), getMonth(), day);

    if (mode === "single") {
      if (isDateInRange(date) && onDateSelect) {
        onDateSelect(date);
      }
    } else if (mode === "range") {
      if (!internalRangeStart || (internalRangeStart && internalRangeEnd)) {
        setInternalRangeStart(date);
        setInternalRangeEnd(null);
      } else {
        if (date < internalRangeStart) {
          setInternalRangeStart(date);
        } else {
          setInternalRangeEnd(date);
          if (onRangeSelect && internalRangeStart) {
            onRangeSelect(internalRangeStart, date);
          }
        }
      }
    }
  };

  const getCalendarDays = () => {
    const days: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      days.push(day);
    }
    return days;
  };

  const changeMonth = (months: number) => {
    setCurrentDate(new Date(getYear(), getMonth() + months, 1));
  };

  const isDateInRange = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    return performanceDates.includes(dateString);
  };

  const isWithinSelectedRange = (date: Date) => {
    return (
      internalRangeStart &&
      internalRangeEnd &&
      date >= internalRangeStart &&
      date <= internalRangeEnd
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-grayscale-20 py-[23px] px-8 rounded-[5px]">
      <div className="w-full flex justify-between items-center mb-[35px]">
        <BackArrow
          width="18"
          height="18"
          viewBox="0 0 11 20"
          className="cursor-pointer text-grayscale-60"
          onClick={() => changeMonth(-1)}
        />
        <span className="text-grayscale-80 headline2-bold">
          {`${getYear()}년 ${getMonth() + 1}월`}
        </span>
        <RightArrow
          width="18"
          height="18"
          viewBox="0 0 11 20"
          className="cursor-pointer text-grayscale-60"
          onClick={() => changeMonth(1)}
        />
      </div>

      <table
        className="text-center w-full"
        style={{ borderCollapse: "collapse" }}
      >
        <tbody>
          {(() => {
            const days = getCalendarDays();
            const rows = [];
            for (let i = 0; i < days.length; i += 7) {
              const week = days.slice(i, i + 7);
              rows.push(
                <tr key={i}>
                  {week.map((day, index) => {
                    const date = day
                      ? new Date(getYear(), getMonth(), day)
                      : null;
                    const isInRange =
                      mode === "single" && date && isDateInRange(date);
                    const isSelected =
                      mode === "single" &&
                      date &&
                      selectedDate &&
                      selectedDate.toDateString() === date.toDateString();
                    const isWithinRange =
                      mode === "range" && date && isWithinSelectedRange(date);
                    const isRangeStart =
                      mode === "range" &&
                      date &&
                      internalRangeStart &&
                      date.toDateString() === internalRangeStart.toDateString();
                    const isRangeEnd =
                      mode === "range" &&
                      date &&
                      internalRangeEnd &&
                      date.toDateString() === internalRangeEnd.toDateString();

                    return (
                      <td key={index} className="p-0">
                        {day ? (
                          <CalendarDay
                            mode={mode}
                            day={day}
                            isSelected={!!isSelected}
                            isInRange={!!isInRange}
                            isWithinRange={!!isWithinRange}
                            isRangeStart={!!isRangeStart}
                            isRangeEnd={!!isRangeEnd}
                            onClick={() => handleDateClick(day)}
                          />
                        ) : (
                          <div className="h-full" />
                        )}
                      </td>
                    );
                  })}
                </tr>,
              );
            }
            return rows;
          })()}
        </tbody>
      </table>
    </div>
  );
};
