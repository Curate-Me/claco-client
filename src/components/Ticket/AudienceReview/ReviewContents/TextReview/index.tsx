import { ReactComponent as Required } from "@/assets/svgs/required.svg";
import { TextReviewProps } from "@/types";

export const TextReview = ({ value, onChange }: TextReviewProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 500) {
      onChange(text);
    }
  };
  return (
    <div className="flex flex-col mt-[40px]">
      <div className="flex">
        <span className="headline2-bold text-grayscale-80">
          감상평을 남겨주세요
        </span>
        <Required />
      </div>
      <div className="h-[214px] flex items-end flex-col gap-4 mt-5 px-[19px] pt-[21px] pb-[14px] bg-grayscale-20 rounded-[5px]">
        <textarea
          placeholder={`감상 포인트, 연주자의 음악과 연기, 스토리, 무대 연출,\n공연의 완성도 등 공연에 대해 느낀 점과 기억에 남는\n모든 것을 자유롭게 작성해보세요.`}
          className="resize-none w-full min-h-[140px] bg-transparent text-grayscale-80 body2-medium outline-none placeholder:text-grayscale-60"
          value={value}
          onChange={handleChange}
        />
        <span className="self-end caption-12 text-grayscale-60">
          {value.length}/500
        </span>
      </div>
    </div>
  );
};
