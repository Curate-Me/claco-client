import { PrfGuidance } from "@/components/ShowDetail/ShowInformation/ShowEssentials";
import { DaysMapType } from "@/types";

const daysMap: DaysMapType[] = [
  { day: "일요일", dayIndex: 0 },
  { day: "월요일", dayIndex: 1 },
  { day: "화요일", dayIndex: 2 },
  { day: "수요일", dayIndex: 3 },
  { day: "목요일", dayIndex: 4 },
  { day: "금요일", dayIndex: 5 },
  { day: "토요일", dayIndex: 6 },
];

const extractSchedule = (dtguidance: string): PrfGuidance[] => {
  if (!dtguidance) return [];

  const scheduleEntries = dtguidance.split(", ");
  const schedule: PrfGuidance[] = [];

  const sortTimes = (times: string[]) => {
    return times.sort((a, b) => {
      const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };
      return timeToMinutes(a) - timeToMinutes(b);
    });
  };

  scheduleEntries.forEach((entry) => {
    const match = entry.match(/(.*)\((.*)\)/);
    if (match) {
      let dayRange = match[1].trim();
      const times = sortTimes(match[2].split(",").map((time) => time.trim()));

      if (dayRange === "HOL") {
        dayRange = "일요일";
      }

      if (dayRange.includes("~")) {
        const [startDay, endDay] = dayRange
          .split(" ~ ")
          .map((day) => day.trim());
        const startDayIndex = daysMap.find((d) => d.day === startDay)?.dayIndex;
        const endDayIndex = daysMap.find((d) => d.day === endDay)?.dayIndex;

        if (startDayIndex !== undefined && endDayIndex !== undefined) {
          if (startDayIndex <= endDayIndex) {
            for (let i = startDayIndex; i <= endDayIndex; i++) {
              const fullDay = daysMap.find((d) => d.dayIndex === i)?.day;
              const shortDay = fullDay ? fullDay.slice(0, 1) : null;
              if (shortDay) {
                const existing = schedule.find((item) => item.day === shortDay);
                if (existing) {
                  existing.times = sortTimes([...existing.times, ...times]);
                } else {
                  schedule.push({ day: shortDay, times });
                }
              }
            }
          } else {
            for (let i = startDayIndex; i < daysMap.length; i++) {
              const fullDay = daysMap.find((d) => d.dayIndex === i)?.day;
              const shortDay = fullDay ? fullDay.slice(0, 1) : null;
              if (shortDay) {
                const existing = schedule.find((item) => item.day === shortDay);
                if (existing) {
                  existing.times = sortTimes([...existing.times, ...times]);
                } else {
                  schedule.push({ day: shortDay, times });
                }
              }
            }
            for (let i = 0; i <= endDayIndex; i++) {
              const fullDay = daysMap.find((d) => d.dayIndex === i)?.day;
              const shortDay = fullDay ? fullDay.slice(0, 1) : null;
              if (shortDay) {
                const existing = schedule.find((item) => item.day === shortDay);
                if (existing) {
                  existing.times = sortTimes([...existing.times, ...times]);
                } else {
                  schedule.push({ day: shortDay, times });
                }
              }
            }
          }
        }
      } else {
        const shortDay = dayRange.slice(0, 1);
        const existing = schedule.find((item) => item.day === shortDay);
        if (existing) {
          existing.times = sortTimes([...existing.times, ...times]);
        } else {
          schedule.push({ day: shortDay, times });
        }
      }
    }
  });

  return schedule;
};

export default extractSchedule;
