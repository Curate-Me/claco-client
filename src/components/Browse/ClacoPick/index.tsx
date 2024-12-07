import { ClacoPickShow } from "./ClacoPickShow";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUserStore } from "@/libraries/store/user";
import { ClacoPickProps } from "@/types";
import { useNavigate } from "react-router-dom";

export const ClacoPick = ({ pickData }: ClacoPickProps) => {
  const { nickname } = useUserStore();
  const navigate = useNavigate();

  const gotoConcertDetail = (id: number) => {
    navigate(`/show/${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="headline1-bold text-grayscale-80">
          이런 공연은 어떠세요?
        </span>
        <span className="body2-semibold text-grayscale-60">
          {nickname}님이 좋아할 만한 공연이에요
        </span>
      </div>

      <div className="flex justify-center overflow-x-auto">
        <Swiper
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          className="max-w-screen-sm"
        >
          {pickData.map((pick, index) => (
            <SwiperSlide
              key={index}
              className="w-[114px] rounded-[5px] mr-[13.84px]"
              onClick={() => gotoConcertDetail(pick.id)}
            >
              <ClacoPickShow imageSrc={pick.poster} title={pick.prfnm} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
