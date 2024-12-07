import { useEffect, useState } from "react";
import { ReactComponent as Listen } from "@/assets/svgs/listen.svg";
import { Genre } from "@/components/common/Genre";
import { useUserStore } from "@/libraries/store/user";
import { useGetUserPreferences } from "@/hooks/queries";
import { PreferCategory } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeferredLoading } from "@/hooks/utils";

export type ClacoAnalysisCardProps = {
  type: string;
};

export const ClacoAnalysisCard = ({ type }: ClacoAnalysisCardProps) => {
  const nickname = useUserStore((state) => state.nickname);
  const initialGenreIndex = 0;
  const [currentIndex, setCurrentIndex] = useState<number>(initialGenreIndex);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [userPreference, setUserPreference] = useState<PreferCategory[]>([]);

  const { data, isLoading } = useGetUserPreferences();

  useEffect(() => {
    if (!isLoading && data?.result?.preferCategories) {
      // console.log(data);
      setUserPreference(data.result.preferCategories);
    }
  }, [isLoading, data]);

  useEffect(() => {
    setCurrentIndex(initialGenreIndex);
  }, []);

  useEffect(() => {
    if (!userPreference.length) return;

    const rotateGenre = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % userPreference.length);
        setIsTransitioning(false);
      }, 300);
    };

    const timer = setTimeout(() => {
      const interval = setInterval(rotateGenre, 3500);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userPreference]);

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  if (shouldShowSkeleton) {
    return (
      <div className="flex flex-col gap-[10px] mb-10">
        <Skeleton className="w-[127px] h-[27px]" />
        <Skeleton className="w-[235px] h-[27px]" />
        <Skeleton className="w-full h-[36px]" />
        <div className="flex justify-center mb-[23px]">
          <Skeleton className="w-[252px] h-[252px]" />
        </div>
        <div className="flex justify-between">
          {Array.from(Array(5).keys()).map((_, index) => (
            <div key={index} className="flex flex-col gap-[8px]">
              <Skeleton className="w-[48px] h-[48px]" />
              <Skeleton className="w-[48px] h-[18px]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-[10px] leading-8 text-grayscale-90 heading2-bold">
        {type === "main" ? (
          <>
            클라코가 분석한
            <br />
            {nickname}님의 클래식 취향이에요
          </>
        ) : (
          <>{nickname}님의 공연 취향</>
        )}
      </div>

      <div className="caption-12 text-grayscale-70 border-[1px] border-grayscale-40 rounded-[5px] py-[9px] px-[11px]">
        <span className="flex items-center gap-[11px]">
          <Listen />
          {type === "main"
            ? "클라코 AI가 취향에 꼭 맞는 공연을 추천해드릴게요"
            : "클라코 AI가 활동 내역을 분석해 클래식 취향을 알려드려요"}
        </span>
      </div>

      <div className="relative h-[340px] mb-4">
        <div className="relative w-full h-full">
          {/* 배경 그라데이션 */}
          <div className="z-20 absolute top-0 inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(233,102,58,0.3)_0%,rgba(233,102,58,0.00)_70%)] rounded-full" />

          {/* 장르 컴포넌트 컨테이너 */}
          <div
            className={`flex h-[340px] justify-center items-center transition-all duration-300 ease-in-out ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {userPreference.length > 0 && (
              <Genre
                key={`genre-${currentIndex}`}
                genreKeyword={userPreference[currentIndex].preferenceCategory}
                className={`${
                  type === "main"
                    ? "w-[200px] h-[200px]"
                    : "w-[157px] h-[157px]"
                } object-contain`}
                isShow={true}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-between mb-[21px] ${
          type === "mypage" ? "px-5" : ""
        }`}
      >
        {userPreference.map((item, index) => (
          <Genre key={index} genreKeyword={item.preferenceCategory} />
        ))}
      </div>
    </div>
  );
};
