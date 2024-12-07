import { Swiper, SwiperSlide } from "swiper/react";
import { VerticalInfoCard } from "@/components/Main/InformationCard";
import { forwardRef, useEffect, useState } from "react";
import { ConcertBased } from "@/types";
import { useGetConcertBased } from "@/hooks/queries";
import { useParams } from "react-router-dom";

const RelatedShowsRecommend = forwardRef<HTMLDivElement>((_, ref) => {
  const [concertBased, setConcertBased] = useState<ConcertBased[]>([]);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetConcertBased(Number(id));

  useEffect(() => {
    if (!isLoading && data?.result) {
      setConcertBased(data.result);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>로딩 중..</div>;
  }
  return (
    <section ref={ref}>
      <div className="px-6">
        <span className="headline2-bold text-grayscale-80">
          이 공연도 마음에 들 거예요!
        </span>
        <section className="mt-6">
          <Swiper
            slidesPerView={"auto"}
            pagination={{
              clickable: true,
            }}
            className="max-w-screen-sm"
          >
            {concertBased.map((concert, index) => (
              <SwiperSlide key={index} className="flex w-[231px] gap-[12px]">
                <VerticalInfoCard
                  id={concert.id}
                  image={concert.poster}
                  title={concert.prfnm}
                  genrenm={concert.genrenm}
                  location={concert.fcltynm}
                  dateFrom={concert.prfpdfrom}
                  dateTo={concert.prfpdto}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </section>
  );
});

export default RelatedShowsRecommend;
