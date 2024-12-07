import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { TextReview } from "@/components/Ticket/AudienceReview/ReviewContents/TextReview";
import { StarRating } from "@/components/Ticket/AudienceReview/StarRating";
import { usePutEditTicketReview } from "@/hooks/mutation";
import { useReviewInfoStore } from "@/libraries/store/reviewInfo";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ClacoTicketReviewEditPage = () => {
  const { data } = useReviewInfoStore();
  const { id } = useParams();
  const ticketId = Number(id);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const navigate = useNavigate();
  const { mutate: editClacoTicketReview } = usePutEditTicketReview();

  useEffect(() => {
    // console.log(data);
    setRating(data.starRate);
    setReviewText(data.content);
  }, [setRating, setReviewText, data]);

  const gotoBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    const editData = {
      ticketReviewId: ticketId,
      watchSit: null,
      starRate: rating,
      content: reviewText,
    };
    editClacoTicketReview(editData, {
      onSuccess: () => {
        navigate(`/ticket/${ticketId}`);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  return (
    <div className="pt-[60px] px-6 pb-[52px]">
      <section className="relative flex justify-center mb-[68px]">
        <BackArrow onClick={gotoBack} className="absolute left-0" />
        <div className="headline2-bold">관람 후기</div>
      </section>
      <section className="mb-[82px]">
        <StarRating rating={rating} onRatingChange={setRating} />
      </section>
      <section className="mb-[188px]">
        <TextReview value={reviewText} onChange={setReviewText} />
      </section>
      <button
        onClick={handleConfirm}
        className={`w-full rounded-[5px] bg-primary px-auto py-[14px] body1-medium text-white text-center`}
      >
        완료
      </button>
    </div>
  );
};
