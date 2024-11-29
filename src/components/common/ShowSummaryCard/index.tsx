import { ReactComponent as Heart } from "@/assets/svgs/Heart.svg";
import { CategoryTag } from "@/components/common/CategoryTag";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostLike } from "@/hooks/mutation";
import { extractDateRange } from "@/hooks/utils";
import { ShowSummaryCardProps } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShowSummaryCard = ({ data }: ShowSummaryCardProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(data.liked);
  const mutation = usePostLike();

  const gotoShowDetail = (id: number) => {
    navigate(`/show/${id}`);
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    mutation.mutate(data.id, {
      onError: () => {
        setIsLiked((prev) => !prev);
      },
    });
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          src={data.poster}
          alt="poster"
          className="w-[123px] h-[172px] rounded-[5px] object-cover"
          onClick={() => gotoShowDetail(data.id)}
        />
        <div className="absolute top-0 left-0 w-full h-[70px] bg-gradient-to-b from-[rgba(0,0,0,0.40)] to-[rgba(102,102,102,0.00)] pointer-events-none"></div>

        <div className="absolute top-[10px] left-2 ">
          <CategoryTag categoryType={data.genrenm} />
        </div>

        <span
          className="absolute top-[13px] right-[10px] z-50"
          onClick={handleLike}
        >
          {isLiked ? (
            <Heart className="fill-grayscale-80" />
          ) : (
            <Heart className="fill-none" />
          )}
        </span>
      </div>

      <div className="flex flex-col ml-4 max-w-[207px]" onClick={() => gotoShowDetail(data.id)}>
        <div className="flex flex-col min-w-[186px]">
          <span className="caption-12 self-start mb-[9px]">
            <CategoryTag categoryType={data.prfstate} />
          </span>
          <span className="body2-semibold text-grayscale-80 mb-[10px]">
            {data.prfnm}
          </span>
          <span className="caption-12 text-grayscale-70 mb-[1px]">
            {data.fcltynm}
          </span>
          <span className="caption-12 text-grayscale-50 mb-[7px]">
            {extractDateRange(data.prfpdfrom, data.prfpdto)}
          </span>

          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#3F3F3F] to-transparent mb-[10px]"></div>
        </div>

        <div className="flex overflow-x-auto whitespace-nowrap space-x-[6px] scrollbar-hide">
          {data.categories.map((category, index) => (
            <span
              key={index}
              className="caption-12 px-[13px] py-1 rounded-[5px] bg-grayscale-20 text-grayscale-60"
            >
              {category.category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

ShowSummaryCard.Skeleton = () => {
  return <Skeleton className="h-[179px] w-full flex-shrink-0 rounded-[3px]" />;
};
