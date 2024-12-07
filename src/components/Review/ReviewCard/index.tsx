import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ReactComponent as Star } from "@/assets/svgs/StarRating.svg";
import { useTruncateText } from "@/hooks/utils";
import { ReviewTag } from "@/components/common/ReviewTag";
import { useNavigate } from "react-router-dom";
import { ReviewCardProps } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export const ReviewCard = ({ review, onClick }: ReviewCardProps) => {
  const SHOW_LENGTH = review.reviewImages.length === 0 ? 90 : 60;

  const navigate = useNavigate();
  const gotoReviewDetail = (id: number) => {
    navigate(`/show/1/reviews/${id}`);
  };

  return (
    <div className="py-5 pl-[17px] pr-5 bg-grayscale-20 text-grayscale-80 rounded-[5px]">
      <div className="flex justify-between mb-[17px]">
        <div className="flex items-center space-x-[10px]">
          <img
            src={review.profileImage}
            alt="프로필 이미지"
            className="object-fill w-8 h-8 rounded-full"
          />
          <div className="headline2-bold">{review.userName}</div>
        </div>
      </div>

      <div className="flex space-x-[14px] max-h-[90px] mb-[19px]">
        {review.reviewImages.length === 0 ? null : (
          <div className="relative" onClick={onClick}>
            <img
              src={review.reviewImages?.[0]?.imageUrl}
              alt="공연 이미지"
              className="min-w-[90px] max-w-[90px] h-[90px] rounded-[5px] object-fill"
            />
            <div className="absolute bottom-0 right-0 w-[19px] h-[19px] bg-[#8A8585] caption-12 rounded-br-[5px] flex justify-center items-center">
              <span className="text-center">{review.reviewImages.length}</span>
            </div>
          </div>
        )}

        <div className="flex-col space-y-2">
          <div className="flex items-center space-x-1">
            <Star className="text-secondary2-100/100" />
            <div className="body2-medium text-secondary2-100/100">
              {review.starRate}
            </div>
          </div>
          <div className="body2-medium">
            {useTruncateText(review.content, SHOW_LENGTH)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start space-x-2 mb-[10px]">
        <div className="body2-semibold">공연장</div>
        <div className="text-[12px] font-medium leading-normal tracking-[-0.02em] text-[#8A8585]">
          {review.watchSit}
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto scrollbar-hide mb-[19px]">
        {review.placeReviews.map((lReview) => (
          <ReviewTag key={lReview.placeCategoryId}>
            {lReview.categoryName}
          </ReviewTag>
        ))}
      </div>

      <div className="flex justify-between caption-12">
        <div className="text-grayscale-50">
          {review.createdDate.replace(/-/g, ".")}
        </div>
        <div className="flex items-center space-x-2 text-grayscale-60">
          <div onClick={() => gotoReviewDetail(review.ticketReviewId)}>
            더 보기
          </div>
          <BackArrow
            width="5"
            height="11"
            viewBox="0 0 11 20"
            className="-rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

ReviewCard.Skeleton = () => {
  return <Skeleton className="w-full h-[298px]" />;
};
