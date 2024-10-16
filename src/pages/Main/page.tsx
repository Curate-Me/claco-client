import {
  NearbyEventsSection,
  PersonalizedSection,
  SimilarCollectionSection,
  SimilarShowsSection,
} from "./containers";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

export const MainPage = () => {
  return (
    <div className="pt-[73px]">
      {/* <Swiper direction={"vertical"} className="h-full" speed={1000}>
        <SwiperSlide>
          <NearbyEventsSection />
        </SwiperSlide>
        <SwiperSlide>
          <PersonalizedSection />
        </SwiperSlide>
        <SwiperSlide>
          <SimilarCollectionSection />
        </SwiperSlide>
        <SwiperSlide>
          <SimilarShowsSection />
        </SwiperSlide>
      </Swiper> */}

      <NearbyEventsSection />
      <PersonalizedSection />
      <SimilarCollectionSection />
      <SimilarShowsSection />
    </div>
  );
};
