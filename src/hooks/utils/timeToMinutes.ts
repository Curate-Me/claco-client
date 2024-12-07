const timeToMinutes = (runtime: string): string => {
  if (!runtime) return "공연 시간 정보 없음";

  const hourMatch = runtime.match(/(\d+)시간/);
  const minuteMatch = runtime.match(/(\d+)분/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  const result = hours * 60 + minutes;

  if (result === 0) return "공연 시간 정보 없음";

  return `${result}분`;
};

export default timeToMinutes;
