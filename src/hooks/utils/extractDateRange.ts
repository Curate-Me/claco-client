const extractDateRange = (fromDate: string, toDate: string): string => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };
  if (fromDate && toDate) {
    if (fromDate === toDate) {
      return formatDate(fromDate);
    } else {
      return `${formatDate(fromDate)} ~ ${formatDate(toDate)}`;
    }
  }
  return "공연 기간 정보 없음";
};

export default extractDateRange;
