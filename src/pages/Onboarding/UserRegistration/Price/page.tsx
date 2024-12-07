import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { Price } from "@/components/common/Price";
import { useState } from "react";
import { useUserStore } from "@/libraries/store/user";
import { useOnboardingStore } from "@/libraries/store/onboarding";

export const SelectPricePage = () => {
  const navigate = useNavigate();
  const nickname = useUserStore((state) => state.nickname);
  const setMinPrice = useOnboardingStore((state) => state.setMinPrice);
  const setMaxPrice = useOnboardingStore((state) => state.setMaxPrice);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(1000000);

  const handleBackClick = () => {
    navigate("/create/location");
  };

  const handleConfirmClick = () => {
    setMinPrice(selectedMinPrice);
    setMaxPrice(selectedMaxPrice);
    navigate("/create/concept");
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-background-dark flex flex-col">
      <div className="flex flex-col flex-grow w-full h-auto px-[24px] pt-[4.75rem] pb-[4.56rem] gap-[0.5rem]">
        <div className="flex flex-col gap-[2.44rem]">
          <div className="flex-col">
            <BackArrow className="mb-[1.19rem]" onClick={handleBackClick} />
            <Progress value={33.33} />
          </div>
          <span className="heading1-bold text-grayscale-90">
            맞춤 공연 추천 전,
            <br />
            {nickname}님에 대해 알려주세요
          </span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col mb-[200px]">
            <span className="body1-medium text-grayscale-60">
              선호하는 티켓 가격 범위를 알려주세요.
            </span>
            <div className="slide-up">
              <Price
                minPrice={selectedMinPrice}
                maxPrice={selectedMaxPrice}
                onMinPriceChange={setSelectedMinPrice}
                onMaxPriceChange={setSelectedMaxPrice}
              />
            </div>
          </div>
          <ConfirmButton isChecked={true} onClick={handleConfirmClick}>
            다음
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};
