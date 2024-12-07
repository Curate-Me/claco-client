import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { forwardRef } from "react";
import { ReviewSummaryCard } from "./ReviewSummaryCard";
import { useNavigate, useParams } from "react-router-dom";
import { TicketSimpleReview } from "@/types";

export type AudienceReviewsProps = {
  reviews: TicketSimpleReview[];
};

const AudienceReviews = forwardRef<HTMLDivElement, AudienceReviewsProps>(
  ({ reviews }, ref) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const gotoShowReview = () => {
      navigate(`/show/${id}/reviews`);
    };
    return (
      <section ref={ref}>
        <div className="px-6">
          <div className="flex items-center space-x-[14px] mb-[26px]">
            <span className="headline2-bold text-grayscale-80">감상 리뷰</span>
            <div
              className="caption-12 text-grayscale-60 underline"
              onClick={gotoShowReview}
            >
              전체 보기
            </div>
          </div>

          {reviews.length > 0 ? (
            <Swiper
              spaceBetween={12}
              slidesPerView={"auto"}
              pagination={{
                clickable: true,
              }}
              className="max-w-screen-sm mb-[86px]"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} className="w-[194px]">
                  <ReviewSummaryCard
                    ticketReviewId={review.ticketReviewId}
                    nickname={review.nickname}
                    starRate={review.starRate}
                    content={review.content}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-full py-[62px] bg-grayscale-10 text-center mb-[52px]">
              <p className="body1-medium text-grayscale-60">
                아직 등록된 리뷰가 없어요
              </p>
            </div>
          )}
        </div>
      </section>
    );
  },
);

export default AudienceReviews;
