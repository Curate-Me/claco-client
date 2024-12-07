import { CalendarDayProps } from "@/types";

export const CalendarDay = ({
  day,
  isSelected,
  isInRange,
  isWithinRange,
  isRangeStart,
  isRangeEnd,
  mode,
  onClick,
}: CalendarDayProps) => {
  return (
    <div className="w-full relative flex items-center justify-center w-9 h-9 my-[5px]">
      {isWithinRange && (
        <div
          className={`absolute inset-0 z-30 bg-grayscale-30 ${
            isRangeStart
              ? "rounded-l-full left-2"
              : isRangeEnd
                ? "rounded-r-full right-2"
                : ""
          } bg-grayscale-30`}
        />
      )}

      <div className="flex">
        <div
          className={`flex items-center justify-center rounded-full w-9 h-9 body1-medium z-50 ${
            day
              ? isSelected || isRangeStart || isRangeEnd
                ? "bg-grayscale-80 text-grayscale-30"
                : isInRange
                  ? "text-grayscale-80"
                  : !isWithinRange && mode !== "single"
                    ? "text-grayscale-60"
                    : isWithinRange
                      ? "text-grayscale-60"
                      : "text-grayscale-50"
              : ""
          }`}
          onClick={day ? onClick : undefined}
        >
          {day}
        </div>
      </div>
    </div>
  );
};
