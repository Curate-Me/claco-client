import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ReactComponent as Star } from "@/assets/svgs/StarRating.svg";
import { ReviewTag } from "@/components/common/ReviewTag";
import { useNavigate, useParams } from "react-router-dom";
import { useThumbnailModal } from "@/hooks/utils";
import { ThumbnailModal } from "@/components/common/Modal/ThumbnailModal";
import { useGetConcertReviewDetail } from "@/hooks/queries";

export const ReviewDetailPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const reviewId_ = Number(reviewId);
  const { data: reviewList } = useGetConcertReviewDetail(reviewId_);

  const {
    thumbsSwiper,
    isThumbnailShow,
    isAnimating,
    selectIndex,
    setThumbsSwiper,
    setSelectIndex,
    handleImageClick,
  } = useThumbnailModal();

  const navigate = useNavigate();

  const gotoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative">
      <ThumbnailModal
        isShow={isThumbnailShow}
        isAnimating={isAnimating}
        thumbsSwiper={thumbsSwiper}
        selectIndex={selectIndex.index}
        images={
          reviewList?.result.reviewImages.map((img) => img.imageUrl) ?? []
        }
        onClose={handleImageClick}
        setThumbsSwiper={setThumbsSwiper}
      />
      <div className="pt-[60px] px-6">
        <section className="relative flex justify-center mb-[53px]">
          <BackArrow onClick={gotoBack} className="absolute left-0" />
          <div className="headline2-bold">리뷰</div>
        </section>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-[10px]">
            <img
              src={reviewList?.result.profileImage}
              alt="프로필 이미지"
              className="object-fill w-8 h-8 rounded-full"
            />
            <div className="headline2-bold">{reviewList?.result.userName}</div>
            <div className="flex items-center space-x-1 ml-[3px]">
              <Star className="text-secondary2-100/100" />
              <div className="body2-medium text-secondary2-100/100">
                {reviewList?.result.starRate}
              </div>
            </div>
          </div>
          <div>
            <div className="caption-12 text-grayscale-50">
              {reviewList?.result.createdDate.replace(/-/g, ".")}
            </div>
          </div>
        </div>
        <div className="mb-4 body2-medium">{reviewList?.result.content}</div>
        <div className="flex space-x-[11px] mb-[35px] overflow-scroll scrollbar-hide">
          {reviewList?.result.reviewImages?.map((image, index) => (
            <img
              onClick={() => {
                handleImageClick();
                setSelectIndex({
                  page: 1,
                  index: 0,
                });
              }}
              key={index}
              src={image.imageUrl}
              alt="리뷰 이미지"
              className="min-w-[90px] max-w-[90px] max-h-[90px] object-contain rounded-[5px]"
            />
          ))}
        </div>
        <div className="mb-12">
          <div className="body2-medium mb-[15px]">공연 특징</div>
          <div className="flex flex-wrap justify-start gap-x-2 gap-y-4">
            {reviewList?.result.tagReviews.map((tag) => (
              <ReviewTag key={tag.tagCategoryId}>{tag.tagName}</ReviewTag>
            ))}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex items-center justify-start space-x-2 mb-[15px]">
            <div className="body2-semibold">공연장</div>
            <div className="text-[12px] font-medium leading-normal tracking-[-0.02em] text-[#8A8585]">
              {reviewList?.result.watchSit}
            </div>
          </div>
          <div className="flex flex-wrap justify-start gap-x-2 gap-y-4">
            {reviewList?.result.placeReviews.map((lReview) => (
              <ReviewTag key={lReview.placeCategoryId} isPlace={true}>
                {lReview.categoryName}
              </ReviewTag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
