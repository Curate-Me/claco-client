import { ReactComponent as Book } from "@/assets/svgs/Book.svg";
import { Genre } from "@/components/common/Genre";
import { TagCategory } from "@/types";

export type PerformacneAttributesProps = {
  categories: TagCategory[];
  title: string;
};

export const PerformanceAttributes = ({
  categories,
  title,
}: PerformacneAttributesProps) => {
  return (
    <div>
      <div className="flex space-x-2 items-center justify-start mb-[22px]">
        <Book />
        <span className="headline2-bold">{title}</span>
      </div>
      <div className="flex justify-between px-[13px]">
        {categories.map((item) => (
          <Genre
            key={item.tagCategoryId}
            genreImgURL={item.iconUrl}
            genreKeyword={item.tagName}
            className="caption-12 text-common-white w-[43px] h-[43px]"
          />
        ))}
      </div>
    </div>
  );
};
