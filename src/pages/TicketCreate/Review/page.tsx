import { Progress } from "@/components/ui/progress";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfirmButton } from "@/components/common/Button";
import { ReviewContents } from "@/components/Ticket/AudienceReview/ReviewContents";
import { StarRating } from "@/components/Ticket/AudienceReview/StarRating";
import { KeywordTags } from "@/components/Ticket/AudienceReview/KeywordTags";
import { Modal } from "@/components/common/Modal";
import { ReviewQuestions } from "@/components/Ticket/AudienceReview/ReviewQuestions";
import { PlaceCategory, TagCategory, TicketReviewRequest } from "@/types";
import { usePostTicketReview } from "@/hooks/mutation";
import getTagCategories from "@/apis/useGetTagCategories";
import getPlaceCategories from "@/apis/useGetPlaceCategories";
import { useDeferredLoading } from "@/hooks/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const TicketReviewPage = () => {
  const navigate = useNavigate();
  const { mutate: postTicketReview } = usePostTicketReview();

  const [rating, setRating] = useState(0);
  const [selectedKeywordTags, setSelectedKeywordTags] = useState<string[]>([]);
  const [selectedSoundTag, setSelectedSoundTag] = useState<string | null>(null);
  const [selectedSeatTag1, setSelectedSeatTag1] = useState<string | null>(null);
  const [selectedSeatTag2, setSelectedSeatTag2] = useState<string | null>(null);
  const [selectedSightTag, setSelectedSightTag] = useState<string | null>(null);
  const [selectedAccessibilityTag, setSelectedAccessibilityTag] = useState<
    string | null
  >(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tagCategories, setTagCategories] = useState<TagCategory[]>([]);
  const [placeCategories, setPlaceCategories] = useState<PlaceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagData, placeData] = await Promise.all([
          getTagCategories(),
          getPlaceCategories(),
        ]);

        setTagCategories(tagData.result.categories);
        setPlaceCategories(placeData.result.categories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    handleOpenModal();
  };

  const handleKeywordTagClick = (tag: string) => {
    setSelectedKeywordTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      if (prevTags.length < 5) {
        return [...prevTags, tag];
      }
      return prevTags;
    });
  };

  const handleConfirmClick = () => {
    if (!isComplete) return;

    let clacoBookId;

    if (localStorage.getItem("clacoBookId")) {
      clacoBookId = Number(localStorage.getItem("clacoBookId"));
    }

    const selectedPlaceReview: PlaceCategory[] = [
      selectedSoundTag,
      selectedSeatTag1,
      selectedSeatTag2,
      selectedSightTag,
      selectedAccessibilityTag,
    ]
      .filter(Boolean)
      .map((selectedTag) =>
        placeCategories.find(
          (category) => category.categoryName === selectedTag,
        ),
      )
      .filter((category): category is PlaceCategory => category !== undefined);

    const selectedTags: TagCategory[] = selectedKeywordTags
      .map((selectedTag) =>
        tagCategories?.find((category) => category.tagName === selectedTag),
      )
      .filter((category): category is TagCategory => category !== undefined);
    const request: TicketReviewRequest = {
      concertId: JSON.parse(localStorage.getItem("showId") || '""'),
      clacoBookId: clacoBookId,
      watchDate: localStorage.getItem("showDate") || "",
      watchRound: localStorage.getItem("showTime") || "",
      watchSit: localStorage.getItem("seat") || "",
      starRate: rating,
      casting: localStorage.getItem("castingList") || "",
      content: reviewText,
      placeReviewIds: selectedPlaceReview,
      tagCategoryIds: selectedTags,
      files: files,
    };

    postTicketReview(request);
  };

  useEffect(() => {
    const allRequiredSelected =
      rating >= 0 &&
      selectedKeywordTags.length === 5 &&
      selectedSoundTag !== null &&
      selectedSeatTag1 !== null &&
      selectedSeatTag2 !== null &&
      selectedSightTag !== null &&
      selectedAccessibilityTag !== null &&
      reviewText.length > 0;

    setIsComplete(allRequiredSelected);
  }, [
    rating,
    selectedKeywordTags,
    selectedSoundTag,
    selectedSeatTag1,
    selectedSeatTag2,
    selectedSightTag,
    selectedAccessibilityTag,
    reviewText,
  ]);

  if (isLoading || shouldShowSkeleton) {
    return (
      <div className="relative flex flex-col min-h-screen px-[24px] pt-[46px] pb-[60px]">
        <div className="flex flex-col gap-[33px] mb-[29px]">
          <div className="relative flex items-center justify-center">
            <BackArrow
              width="9"
              height="18"
              viewBox="0 0 11 20"
              className="absolute left-0"
              onClick={handleBackClick}
            />
            <span className="headline2-bold text-grayscale-80">티켓 등록</span>
          </div>
          <Progress value={80} />
        </div>
        <Skeleton className="w-[140px] h-[26px] mb-[29px]" />
        <Skeleton className="w-[140px] h-[26px] mb-[29px]" />
        <Skeleton className="w-[292px] h-[158px] mb-[32px]" />
        <Skeleton className="w-[218px] h-[81px] mb-[40px]" />
        <Skeleton className="w-[234px] h-[126px] mb-[40px]" />
        <Skeleton className="w-[254px] h-[81px]" />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen px-[24px] pt-[46px] pb-[60px]">
      <div className="flex flex-col gap-[33px]">
        <div className="relative flex items-center justify-center">
          <BackArrow
            width="9"
            height="18"
            viewBox="0 0 11 20"
            className="absolute left-0"
            onClick={handleBackClick}
          />
          <span className="headline2-bold text-grayscale-80">티켓 등록</span>
        </div>
        <Progress value={80} />
      </div>

      {isModalOpen && (
        <Modal
          positiveButtonText="계속하기"
          negativeButtonText="나가기"
          onPositiveButtonClick={handleCloseModal}
          onNegativeButtonClick={() => {
            localStorage.removeItem("clacoBookId");
            localStorage.removeItem("showDate");
            localStorage.removeItem("showTime");
            localStorage.removeItem("showPlace");
            localStorage.removeItem("seat");
            localStorage.removeItem("castingList");
            navigate("/ticketbook");
          }}
        >
          <div className="flex flex-col items-center justify-center mt-[13px] mb-[30px]">
            <span className="headline2-bold text-grayscale-80">
              티켓 등록을 그만두시겠어요?
            </span>
            <span className="caption-12 text-grayscale-70">
              입력된 정보는 저장되지 않습니다
            </span>
          </div>
        </Modal>
      )}

      <StarRating rating={rating} onRatingChange={setRating} />
      <KeywordTags
        selectedTags={selectedKeywordTags}
        onTagClick={handleKeywordTagClick}
        tagCategories={tagCategories || []}
      />
      <ReviewQuestions
        selectedSoundTag={selectedSoundTag}
        setSelectedSoundTag={setSelectedSoundTag}
        selectedSeatTag1={selectedSeatTag1}
        setSelectedSeatTag1={setSelectedSeatTag1}
        selectedSeatTag2={selectedSeatTag2}
        setSelectedSeatTag2={setSelectedSeatTag2}
        selectedSightTag={selectedSightTag}
        setSelectedSightTag={setSelectedSightTag}
        selectedAccessibilityTag={selectedAccessibilityTag}
        setSelectedAccessibilityTag={setSelectedAccessibilityTag}
        placeCategories={placeCategories}
      />

      <ReviewContents
        value={reviewText}
        onChange={setReviewText}
        files={files}
        onFileChange={(e) =>
          setFiles([...files, ...Array.from(e.target.files || [])])
        }
      />

      <ConfirmButton
        isChecked={isComplete}
        onClick={handleConfirmClick}
        disabled={!isComplete}
      >
        완료
      </ConfirmButton>
    </div>
  );
};
