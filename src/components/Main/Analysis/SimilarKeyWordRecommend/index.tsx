import { HorizontalInfoCard } from "@/components/Main/InformationCard";
import { Genre } from "@/components/common/Genre";
import { useEffect, useState } from "react";
import dynamic from "@/assets/images/Genre/dynamic.png";
import romantic from "@/assets/images/Genre/romantic.png";
import tragic from "@/assets/images/Genre/tragic.png";
import { useUserStore } from "@/libraries/store/user";
import { useGetItemBased } from "@/hooks/queries";
import { UserItemBased } from "@/types";

const USER_GENRE = [
  { imgUrl: dynamic, keyWord: "역동적인" },
  { imgUrl: romantic, keyWord: "낭만적인" },
  { imgUrl: tragic, keyWord: "비극적인" },
];

export const SimilarKeyWordRecommend = () => {
  const [itemBased, setItemBased] = useState<UserItemBased>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const nickname = useUserStore((state) => state.nickname);
  const { data, isLoading } = useGetItemBased();

  useEffect(() => {
    if (!isLoading && data?.result) {
      // console.log(data.result);
      setItemBased(data.result);
    }
  }, [isLoading, data]);

  useEffect(() => {
    const rotateGenre = () => {
      setCurrentIndex((prev) => (prev + 1) % USER_GENRE.length);
    };

    const interval = setInterval(rotateGenre, 3500);
    return () => clearInterval(interval);
  }, []);

  const getItemStyle = (index: number) => {
    const baseStyle =
      "absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out";

    const position = index - currentIndex;

    const normalizedPosition =
      position < -1 ? position + 3 : position > 1 ? position - 3 : position;

    if (normalizedPosition === 0) {
      return `${baseStyle} left-1/2 -translate-x-1/2 z-30 scale-100 opacity-100`;
    } else if (normalizedPosition === 1) {
      return `${baseStyle} left-[85%] -translate-x-1/2 z-20 scale-75 opacity-60`;
    } else {
      return `${baseStyle} left-[15%] -translate-x-1/2 z-10 scale-75 opacity-60`;
    }
  };

  if (isLoading) {
    //skeleton UI 적용될 부분
    return <div>로딩 중..</div>;
  }

  return (
    <section>
      <div className="py-[22px]">
        <section className="px-6">
          <div className="leading-8 text-grayscale-90 heading2-bold">
            {itemBased?.likedHistory ? (
              <>
                {nickname}님이 좋아요한 공연과 <br />
                비슷한 느낌의 공연도 확인해보세요
              </>
            ) : (
              <>
                많은 사람들이 주목한 <br />
                클래식 공연도 확인해보세요
              </>
            )}
          </div>
          <div className="relative h-[355px] overflow-hidden">
            <div className="w-[355px] h-[355px] absolute flex justify-center items-center opacity-70 bg-[radial-gradient(circle_at_50%_50%,rgba(233,102,58,0.3)_0%,rgba(233,102,58,0.00)_70%)] rounded-full" />
            {itemBased?.keywords.map((item, index) => (
              <div key={index} className={getItemStyle(index)}>
                <Genre
                  genreKeyword={item}
                  className={`${index === currentIndex ? "w-[117px] h-[127px]" : ""} `}
                  size={index === currentIndex ? 113 : 48}
                />
              </div>
            ))}
          </div>
        </section>
        <div className="h-[44px] bg-gradient-to-t from-[#F37D55]/60 to-[#1C1C1C] opacity-50 shadow-main" />
        <section className="flex flex-col justify-center items-center space-y-3 mt-[26px] mb-[60px] px-6">
          {itemBased?.recommendationConcertsResponseV1s.map((concert) => (
            <HorizontalInfoCard
              key={concert.id}
              id={concert.id}
              image={concert.poster}
              title={concert.prfnm}
              location={concert.fcltynm}
              dateFrom={concert.prfpdfrom}
              dateTo={concert.prfpdto}
              genrenm={concert.genrenm}
            />
          ))}
        </section>
      </div>
    </section>
  );
};
