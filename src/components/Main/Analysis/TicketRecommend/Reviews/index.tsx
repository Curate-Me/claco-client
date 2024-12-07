import { useTruncateText } from "@/hooks/utils";
import { ReactComponent as Chat } from "@/assets/svgs/chat.svg";
import { TicketReviewSummary } from "@/types";

export type ReviewsProps = {
  data: TicketReviewSummary;
};

export const Reviews = ({ data }: ReviewsProps) => {
  return (
    <div className="mt-[21px]">
      <div className="flex justify-center items-center w-full min-h-[51px] headline1-bold mb-[18px]">
        <span className="w-[350px] text-center">{data.concertName}</span>
      </div>
      <div className="w-[351px] h-[119px] mx-auto px-[15px] py-[17px] rounded-[3.52px] bg-grayscale-20">
        <div className="flex justify-start items-center space-x-[9px]">
          <Chat />
          <div className="headline2-bold text-common-white">
            {data.nickName}님의 리뷰
          </div>
        </div>
        <div className="mt-[14px] body2-medium text-grayscale-70">
          {useTruncateText(data.content, 64)}
        </div>
      </div>
    </div>
  );
};
