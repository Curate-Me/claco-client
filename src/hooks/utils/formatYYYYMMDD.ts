import { parse, format } from "date-fns";
import { ko } from "date-fns/locale";

const formatDateYYYYMMDD = (dateStr: string) => {
  const date = parse(dateStr.split(" ")[0], "yyyy-MM-dd", new Date());
  const formattedDate = format(date, "yyyy.MM.dd");
  const shortDay = `(${format(date, "E", { locale: ko })})`;

  return `${formattedDate} ${shortDay}`;
};

export default formatDateYYYYMMDD;
