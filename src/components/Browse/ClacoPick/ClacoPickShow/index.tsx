import { ClacoPickShowProps } from "@/types";

export const ClacoPickShow = ({ imageSrc, title }: ClacoPickShowProps) => {
  return (
    <div className="flex flex-col w-[114px] gap-[9.92px]">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[149px] rounded-[1.68px]"
      />
      <span className="caption-13 text-grayscale-80 whitespace-normal">
        {title}
      </span>
    </div>
  );
};
