import { ReviewTagProps } from "@/types";

export const ReviewTag = ({ isPlace = false, children, onClick, isSelected = false }: ReviewTagProps) => {
  return (
    <div
      className={`rounded-[5px] inline-flex caption-13 px-[13px] whitespace-nowrap ${
        isSelected ? "bg-grayscale-80 text-dark" : "bg-grayscale-30"
      } ${isPlace ? "py-[8.5px]" : "py-[5.5px]"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};