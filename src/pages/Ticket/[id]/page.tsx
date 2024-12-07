import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ReactComponent as Trash } from "@/assets/svgs/trash.svg";
import { ReactComponent as Edit } from "@/assets/svgs/Edit.svg";
import { ReactComponent as Star } from "@/assets/svgs/StarRating.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeferredLoading, useThumbnailModal } from "@/hooks/utils";
import { DeleteClacoTicketModal } from "@/components/Ticket/Modal/Delete/ClacoTicket";
import { CategoryTag } from "@/components/common/CategoryTag";
import { PerformanceAttributes } from "@/components/Ticket/PerformanceAttributes";
import { ReviewTag } from "@/components/common/ReviewTag";
import { Modal } from "@/components/common/Modal";
import { ThumbnailModal } from "@/components/common/Modal/ThumbnailModal";
import { TicketReviewDetailRequest } from "@/types";
import { useGetTicketReviewDetail } from "@/hooks/queries";
import { useDeleteClacoTicket, usePutEditTicketReview } from "@/hooks/mutation";
import { useReviewInfoStore } from "@/libraries/store/reviewInfo";
import { Skeleton } from "@/components/ui/skeleton";

export const ClacoTicketDetailPage = () => {
  const { id } = useParams();
  const ticketId = Number(id);
  const { setReviewInfo } = useReviewInfoStore();

  const { data, isLoading } = useGetTicketReviewDetail(ticketId);
  const { mutate: editClacoTicketReview } = usePutEditTicketReview();
  const { mutate: deleteClacoTicket } = useDeleteClacoTicket();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [viewingSeat, setViewingSeat] = useState<string>("");
  const [reviewData, setReviewData] = useState<TicketReviewDetailRequest>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    thumbsSwiper,
    isThumbnailShow,
    isAnimating,
    selectIndex,
    setThumbsSwiper,
    setSelectIndex,
    handleImageClick,
  } = useThumbnailModal();

  useEffect(() => {
    if (data && !isLoading) {
      setReviewData(data.result);
      setReviewInfo({
        starRate: data.result.starRate,
        content: data.result.content,
      });
    }
  }, [data, isLoading, setReviewInfo]);

  const navigate = useNavigate();

  const gotoBack = () => {
    const id = localStorage.getItem("prevTicketBookId");
    const title = localStorage.getItem("prevClacoBookTitle");
    if (id || title) {
      navigate(`/ticketbook/${id}?title=${title}`);
    } else {
      navigate(-1);
    }
  };

  const gotoTicketReviewEdit = () => {
    navigate(`/ticket/${Number(id)}/edit`);
  };

  const handleEditSeat = () => {
    const editData = {
      ticketReviewId: ticketId,
      watchSit: JSON.stringify(viewingSeat),
      starRate: null,
      content: null,
    };
    editClacoTicketReview(editData, {
      onSuccess: () => {
        setIsEditModalOpen(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleDeleteTicketReview = () => {
    deleteClacoTicket(ticketId, {
      onSuccess: () => {
        setIsModalOpen(false);
        // navigate("/ticketbook");
        navigate(-1);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    if (data?.result?.ticketImage) {
      const img = new Image();
      img.src = data.result.ticketImage;
      img.onload = () => setImageLoaded(true);
    }
  }, [data]);

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  if (shouldShowSkeleton) {
    return (
      <div className="relative flex flex-col px-6 mb-[234px]">
        <div className="flex justify-start w-full gap-2 mt-[95px] mb-2">
          <CategoryTag.Skeleton />
          <CategoryTag.Skeleton />
        </div>
        <Skeleton className="w-[299px] h-[30px]" />
        <div className="mt-[54px] mb-[60px] flex justify-center">
          <Skeleton className="w-[213px] h-[471px]" />
        </div>
        <Skeleton className="w-full h-[154px]" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col pt-[46px] items-center justify-center px-6 pb-[220px]">
      <ThumbnailModal
        isShow={isThumbnailShow}
        isAnimating={isAnimating}
        thumbsSwiper={thumbsSwiper}
        selectIndex={selectIndex.index}
        images={reviewData?.imageUrlS.map((image) => image.imageUrl) ?? []}
        onClose={handleImageClick}
        setThumbsSwiper={setThumbsSwiper}
      />
      <div className="flex justify-between items-center w-full mb-[27px] h-[26px]">
        <BackArrow onClick={gotoBack} />
        {reviewData?.editor && <Trash onClick={() => setIsModalOpen(true)} />}
      </div>
      <div className="flex-col justify-start w-full space-y-2 mb-[54px]">
        {reviewData && (
          <div className="flex space-x-1">
            <CategoryTag categoryType={reviewData?.genreName} />
          </div>
        )}

        <div className="heading2-bold">{reviewData?.concertName}</div>
      </div>
      <div className="mb-[60px]">
        {reviewData?.ticketImage && (
          <img
            src={reviewData.ticketImage}
            alt="클라코 티켓 이미지"
            className={`w-[213px] h-[471px] object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>
      <div className="w-full h-[154px] bg-grayscale-20 px-[27px] pt-[18px] pb-[45px] rounded-[5px] mb-12">
        {reviewData && (
          <PerformanceAttributes
            categories={reviewData.concertTags}
            title={"공연을 보며 이런 느낌이 떠올랐어요"}
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-start gap-[5px] mb-5">
          <div className="headline2-bold">나의 공연 감상</div>
          {reviewData?.editor && (
            <Edit
              viewBox="0 0 18 18"
              width={14}
              height={14}
              className="text-grayscale-60"
              onClick={gotoTicketReviewEdit}
            />
          )}
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-[3px] text-secondary2-100/100">
            <Star />
            <div className="body2-medium">
              {reviewData?.starRate?.toFixed(1)}
            </div>
          </div>
          <div className="caption-12 text-grayscale-50">
            {reviewData?.createdDate.replace(/-/g, ".")} 작성
          </div>
        </div>
        <div className="mb-4 body2-medium">{reviewData?.content}</div>
        <div className="flex space-x-[11px] mb-[35px]">
          {reviewData?.imageUrlS?.map((image, index) => (
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
              className="min-w-[90px] max-h-[90px] rounded-[5px]"
            />
          ))}
        </div>
        <div className="mb-[60px]">
          <div className="headline2-bold mb-[15px]">공연장</div>
          <div className="flex flex-wrap justify-start gap-x-2 gap-y-4">
            {reviewData?.placeReviews.map((lReview) => (
              <ReviewTag key={lReview.placeCategoryId} isPlace={true}>
                {lReview.categoryName}
              </ReviewTag>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-5 headline2-bold">관람 정보</div>
          <div className="grid grid-cols-[100px_1fr] gap-y-4">
            <div className="headline2-bold text-grayscale-70">관람 날짜</div>
            <div className="body1-regular text-grayscale-90">
              {reviewData?.watchDate.replace(/-/g, ".")}
            </div>

            <div className="headline2-bold text-grayscale-70">공연장소</div>
            <div className="body1-regular text-grayscale-90">
              {reviewData?.watchPlace}
            </div>

            <div className="headline2-bold text-grayscale-70">회차</div>
            <div className="body1-regular text-grayscale-90">
              {reviewData && JSON.parse(reviewData.watchRound)}
            </div>

            <div className="headline2-bold text-grayscale-70">캐스팅</div>
            <div className="body1-regular text-grayscale-90 max-w-[240px] flex flex-wrap">
              {reviewData &&
                JSON.parse(reviewData.castings).map(
                  (casting: string, index: number, array: string[]) => (
                    <span
                      key={index}
                      className={
                        index !== array.length - 1 ? "mr-[19px] mb-[19px]" : ""
                      }
                    >
                      {casting.trim()}
                    </span>
                  )
                )}
            </div>

            <div className="flex items-center gap-[9px] headline2-bold text-grayscale-70">
              좌석
              {reviewData &&
              JSON.parse(reviewData.watchSit).trim().length === 0 ? (
                <>
                  {reviewData?.editor && (
                    <Edit
                      viewBox="0 0 18 18"
                      width={14}
                      height={14}
                      onClick={() => setIsEditModalOpen(true)}
                    />
                  )}
                </>
              ) : null}
            </div>
            <div className="flex items-center body1-regular text-grayscale-90">
              {reviewData &&
              JSON.parse(reviewData.watchSit).trim().length === 0 ? null : (
                <>
                  {reviewData && JSON.parse(reviewData.watchSit)}
                  {reviewData?.editor && (
                    <Edit
                      viewBox="0 0 18 18"
                      width={14}
                      height={14}
                      onClick={() => setIsEditModalOpen(true)}
                      className="ml-2"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 모달 컴포넌트 영역 */}
      {isModalOpen && (
        <DeleteClacoTicketModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteTicketReview}
        />
      )}
      {isEditModalOpen && (
        <Modal
          positiveButtonText="확인"
          negativeButtonText="취소"
          onPositiveButtonClick={handleEditSeat}
          onNegativeButtonClick={() => setIsEditModalOpen(false)}
        >
          <div className="w-full flex flex-col items-center justify-center mt-[12.45px] mb-[37px] gap-[13.1px]">
            <span className="headline2-bold text-grayscale-80">
              관람 좌석을 입력해주세요
            </span>
            <input
              className="w-full h-[52px] rounded-[7px] text-center body2-medium text-grayscale-80 bg-grayscale-30 outline-none px-3"
              defaultValue={reviewData && JSON.parse(reviewData.watchSit)}
              onChange={(e) => setViewingSeat(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
