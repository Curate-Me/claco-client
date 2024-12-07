import { forwardRef } from "react";

export type PrfGuidance = {
  day: string;
  times: string[];
};

export type ShowEssentialsProps = {
  fcltynm: string;
  prfruntime: string;
  prfdate: string;
  dtguidance: PrfGuidance[];
  seats: string[];
  prices: string[];
};

const ShowEssentials = forwardRef<HTMLDivElement, ShowEssentialsProps>(
  ({ fcltynm, prfruntime, prfdate, dtguidance, seats, prices }, ref) => {
    return (
      <section ref={ref}>
        <div className="px-6 pb-[103px]">
          <span className="headline2-bold text-grayscale-80">공연 정보</span>

          <div className="flex-col mt-6">
            <div className="flex space-x-[68px] mb-[22px]">
              <span className="headline2-bold text-grayscale-70">기간</span>
              <span className="body1-regular text-grayscale-90">{prfdate}</span>
            </div>

            <div className="flex space-x-[39px] mb-[22px]">
              <span className="headline2-bold text-grayscale-70">공연장소</span>
              <span className="body1-regular text-grayscale-90">{fcltynm}</span>
            </div>

            <div className="flex space-x-[39px] mb-[25px]">
              <span className="headline2-bold text-grayscale-70">러닝타임</span>
              <span className="body1-regular text-grayscale-90">
                {prfruntime}
              </span>
            </div>

            <div className="flex space-x-[39px] mb-[32px]">
              <span className="headline2-bold text-grayscale-70">공연시간</span>
              <div className="flex-col space-y-[12px]">
                <span className="caption-12 text-secondary2-100 mb-[2px]">
                  *해당하는 요일과 시간에만 공연이 진행돼요
                </span>
                {dtguidance.map(({ day, times }: PrfGuidance) => (
                  <div key={day} className="flex space-x-[12px]">
                    <span className="body1-regular text-grayscale-70">
                      {day}
                    </span>
                    <div className="border-[1.5px] border-grayscale-30 rounded-[2px]" />
                    <div className="flex gap-[14px] body1-regular text-grayscale-90">
                      {times.map((time: string, index: number) => (
                        <span key={index}>{time}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-[68px]">
              <span className="headline2-bold text-grayscale-70">가격</span>
              <div className="flex-col space-y-[12px]">
                {seats.map((seat, index) => (
                  <div key={index} className="flex space-x-[12px]">
                    <span className="body1-regular text-grayscale-70">
                      {seat}
                    </span>
                    <div className="border-[1.5px] border-grayscale-30 rounded-[2px]" />
                    <span className="body1-regular text-grayscale-90">
                      {prices[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

export default ShowEssentials;
