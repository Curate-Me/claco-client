import { Skeleton } from "@/components/ui/skeleton";
import { CategoryTagProps } from "@/types";

export const CategoryTag = ({ categoryType, className }: CategoryTagProps) => {
  const tagStyle = () => {
    switch (categoryType) {
      case "서양음악(클래식)":
        return "bg-primary-700";
      case "무용":
        return "bg-[#6370E4]";
      case "공연중":
        return "border-[1px] border-grayscale-70";
      case "공연예정":
        return "border-[1px] border-grayscale-70";
      default:
        return "border-[1px] border-grayscale-70";
    }
  };
  return (
    <div
      className={`max-h-6 inline-flex items-center caption-12 text-common-white rounded-[20px] px-2 py-[3px] ${tagStyle()} ${className}`}
    >
      {categoryType === "서양음악(클래식)"
        ? "클래식"
        : categoryType === "무용"
          ? "무용"
          : categoryType === "공연중"
            ? "공연 중"
            : "공연 예정"}
    </div>
  );
};

CategoryTag.Skeleton = () => {
  return <Skeleton className="w-[43px] h-[22.5px]" />;
};
