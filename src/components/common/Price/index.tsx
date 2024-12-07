import { PriceProps } from "@/types";

export const Price = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceProps) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value + 10000 <= maxPrice) {
      onMinPriceChange(value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value - 10000 >= minPrice) {
      onMaxPriceChange(value);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-[2.88rem]">
        <div className="inline-flex justify-center items-center bg-grayscale-30 px-[1.25rem] py-[0.75rem] rounded-[0.31rem]">
          <span className="body2-medium text-grayscale-90">
            {minPrice.toLocaleString()}원 ~ {maxPrice.toLocaleString()}원
          </span>
        </div>
      </div>

      <div className="relative w-full h-[0.125rem] bg-grayscale-60 mt-[1.56rem]">
        <div
          className="absolute h-[0.125rem] bg-grayscale-90"
          style={{
            left: `${(minPrice / 1000000) * 100}%`,
            right: `${100 - (maxPrice / 1000000) * 100}%`,
          }}
        />
      </div>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={1000000}
          step={10000}
          value={minPrice}
          onChange={handleMinPriceChange}
          className={`absolute w-full appearance-none bg-transparent top-[-9px]`}
        />
        <input
          type="range"
          min={0}
          max={1000000}
          step={10000}
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className={`absolute w-full appearance-none bg-transparent top-[-9px]`}
        />
      </div>
      <div className="flex justify-between mt-[0.81rem]">
        <span className="body2-medium text-grayscale-90">0원</span>
        <span className="body2-medium text-grayscale-90">1,000,000원</span>
      </div>
    </>
  );
};
