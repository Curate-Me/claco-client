import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import { ReactComponent as X } from "@/assets/svgs/X-icon.svg";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export type ThumbnailModalProps = {
  isShow: boolean;
  isAnimating: boolean;
  thumbsSwiper: SwiperType | null;
  selectIndex: number;
  images: string[];
  onClose: () => void;
  setThumbsSwiper: (swiper: SwiperType | null) => void;
};

export const ThumbnailModal = ({
  isShow,
  isAnimating,
  thumbsSwiper,
  selectIndex,
  images,
  onClose,
  setThumbsSwiper,
}: ThumbnailModalProps) => {
  if (!isShow && !isAnimating) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isAnimating ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-dark transition-transform duration-300 ease-out
          h-[calc(100%-100px)]
          ${isAnimating ? "translate-y-0" : "translate-y-full"}`}
      >
        <Swiper
          spaceBetween={10}
          initialSlide={selectIndex}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Thumbs]}
          className="mb-11"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <X
                  className="absolute top-5 left-5 max-[375px]:left-14"
                  onClick={onClose}
                />
                <img
                  src={image}
                  alt="리뷰 이미지"
                  className="object-fill min-w-screen max-w-screen max-[375px]:h-[400px] max-h-[500px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="px-6 thumbnail">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt="리뷰 이미지"
                  className="h-[90px] w-[90px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
