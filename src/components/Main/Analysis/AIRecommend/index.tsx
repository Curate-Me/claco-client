import { MainPosterCard } from "@/components/Main/MainPosterCard";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUserStore } from "@/libraries/store/user";
import { useEffect, useState } from "react";
import { UserBased } from "@/types";
import { useGetUserBased } from "@/hooks/queries";
import { useDeferredLoading } from "@/hooks/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const AIRecommend = () => {
  const [userBased, setUserBased] = useState<UserBased[]>([]);
  const nickname = useUserStore((state) => state.nickname);
  const { data, isLoading } = useGetUserBased();

  useEffect(() => {
    if (!isLoading && data?.result) {
      setUserBased(data.result);
    }
  }, [isLoading, data]);

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  if (shouldShowSkeleton) {
    //skeleton UI 적용될 부분
    return (
      <div className="py-[22px] px-6">
        <div className="flex flex-col gap-2 mb-[23px]">
          <Skeleton className="w-[197px] h-[25px]" />
          <Skeleton className="w-[210px] h-[25px]" />
        </div>
        <Skeleton className="w-full h-[443px]" />
      </div>
    );
  }

  return (
    <div className="py-[22px] px-6">
      <div className="mb-5 leading-8 text-grayscale-90 heading2-bold">
        {nickname}님만의 취향을 담은
        <br />
        공연을 준비했어요
      </div>
      <div className="relative flex justify-center h-[555px]">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          spaceBetween={100}
          className="max-w-[342px] rounded-[5px]"
        >
          {userBased.map((data) => (
            <SwiperSlide key={data.id}>
              <MainPosterCard data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
