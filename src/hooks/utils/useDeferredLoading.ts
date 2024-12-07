import { useState, useEffect } from "react";

//200ms보다 적은 응답 시간이 걸리는 경우 스캘레톤 컴포넌트 UI를 보여주지 않기 위한 커스텀 훅 (사용성 개선을 위함)
const useDeferredLoading = (isLoading: boolean, delay: number = 200) => {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowSkeleton(true);
      }, delay);
    } else {
      setShowSkeleton(false);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading, delay]);

  return {
    shouldShowSkeleton: isLoading && showSkeleton,
  };
};

export default useDeferredLoading;
