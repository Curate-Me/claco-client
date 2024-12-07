import extractSchedule from "./extractSchedule";

export type ShowTimesByDate = {
  [key: string]: { time: string }[];
};

export type ExtractShowTimeProps = {
  prfpdfrom: string;
  prfpdto: string;
  dtguidance: string;
};

const extractShowTime = ({
  prfpdfrom,
  prfpdto,
  dtguidance,
}: ExtractShowTimeProps): ShowTimesByDate => {
  const showTimesByDate: ShowTimesByDate = {};
  const schedule = extractSchedule(dtguidance);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const startDate = new Date(prfpdfrom);
  const endDate = new Date(prfpdto);

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const matchingSchedule = schedule.find((item) => item.day === dayOfWeek);

    if (matchingSchedule && matchingSchedule.times.length > 0) {
      showTimesByDate[dateString] = matchingSchedule.times.map((time) => ({
        time,
      }));
    }
  }

  return showTimesByDate;
};

export default extractShowTime;
