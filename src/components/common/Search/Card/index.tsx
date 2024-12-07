import { CategoryTag } from "@/components/common/CategoryTag";
import { HighlightText } from "../HighLight";
import { extractDateRange } from "@/hooks/utils";
import { SearchCardProps } from "@/types";

export const SearchCard = ({
  data,
  searchKeyWord,
  className = "",
  onClick,
}: SearchCardProps) => {
  return (
    <div
      className={`flex rounded-[5px] bg-grayscale-30 pl-[14px] pr-5 py-[19px] border border-grayscale-30 cursor-pointer ${className}`}
      onClick={onClick}
      data-id={data.id}
    >
      <CategoryTag
        categoryType={data.genrenm}
        className={`${data.genrenm === "서양음악(클래식)" ? "mr-[10px]" : "mr-[20px]"}`}
      />

      <div className="flex flex-col gap-1 body2-medium text-grayscale-80">
        <span className="max-w-[253px] truncate">
          <HighlightText text={data.prfnm} highlight={searchKeyWord || ""} />
        </span>
        <span>{extractDateRange(data.prfpdfrom, data.prfpdto)}</span>
      </div>
    </div>
  );
};
