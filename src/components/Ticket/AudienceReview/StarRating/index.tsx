import { ReactComponent as Required } from "@/assets/svgs/required.svg";
import { ReactComponent as FullStar } from "@/assets/svgs/StarRating.svg";
import { ReactComponent as HalfStar } from "@/assets/svgs/halfStarRating.svg";

import { StarRatingProps } from "@/types";
import { ChangeEvent } from "react";

export const StarRating = ({ rating = 0, onRatingChange }: StarRatingProps) => {
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];

  const handleStarClick = (idx: number) => {
    const newRating = idx + 1;
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onRatingChange) {
      onRatingChange(parseFloat(e.target.value));
    }
  };

  return (
    <div className="flex flex-col mt-[29px] gap-[29px]">
      <div className="flex">
        <span className="headline2-bold text-grayscale-80">
          Q. 공연은 어떠셨나요?
        </span>
        <Required />
      </div>
      <div className="flex w-[140px] items-center gap-[10px] relative">
        {STAR_IDX_ARR.map((_, idx) => {
          const currentRating = rating - idx;

          let StarIcon;
          if (currentRating >= 1) {
            StarIcon = FullStar;
          } else if (currentRating >= 0.5) {
            StarIcon = HalfStar;
          } else {
            StarIcon = null;
          }

          return (
            <span
              key={idx}
              className="inline-flex cursor-pointer"
              onClick={() => handleStarClick(idx)}
            >
              {StarIcon ? (
                StarIcon === HalfStar ? (
                  <div className="relative">
                    <FullStar
                      width={20}
                      height={20}
                      viewBox={"0 0 13 13"}
                      className="text-grayscale-40"
                    />
                    <StarIcon
                      width={19}
                      height={19}
                      viewBox={"0 0 11 19"}
                      className="absolute top-0 z-10 text-secondary2-100/100 -left-1"
                    />
                  </div>
                ) : (
                  <StarIcon
                    width={20}
                    height={20}
                    viewBox={"0 0 13 13"}
                    className="text-secondary2-100/100"
                  />
                )
              ) : (
                <FullStar
                  width={20}
                  height={20}
                  viewBox={"0 0 13 13"}
                  className="text-grayscale-40"
                />
              )}
            </span>
          );
        })}
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={rating}
          onChange={handleRangeChange}
          className="w-[140px] h-full absolute opacity-0 cursor-pointer z-30"
        />
      </div>
    </div>
  );
};
