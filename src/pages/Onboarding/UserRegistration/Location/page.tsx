import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { Location } from "@/components/common/Location";
import { useState } from "react";
import { useOnboardingStore } from "@/libraries/store/onboarding";
import { useUserStore } from "@/libraries/store/user";

export const SelectLocationPage = () => {
  const navigate = useNavigate();
  const nickname = useUserStore((state) => state.nickname);
  const setLocation = useOnboardingStore((state) => state.setRegionPreferences);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const handleBackClick = () => {
    navigate("/create/profile");
  };

  const handleConfirmClick = () => {
    setLocation(selectedLocation);
    navigate("/create/price");
  };

  const handleLocationClick = (location: string) => {
    if (selectedLocation.includes(location)) {
      setSelectedLocation(selectedLocation.filter((loc) => loc !== location));
    } else {
      setSelectedLocation([...selectedLocation, location]);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto bg-background-dark">
      <div className="flex flex-col flex-grow w-full h-auto px-[24px] pt-[4.75rem] pb-[4.56rem] gap-[0.5rem]">
        <div className="flex flex-col gap-[2.44rem]">
          <div className="flex-col">
            <BackArrow className="mb-[1.19rem]" onClick={handleBackClick} />
            <Progress value={22.22} />
          </div>
          <span className="heading1-bold text-grayscale-90">
            맞춤 공연 추천 전,
            <br />
            {nickname}님에 대해 알려주세요
          </span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-[1.56rem]">
            <span className="body1-medium text-grayscale-60">
              선호하는 공연장 위치를 모두 알려주세요.
            </span>
            <div className="slide-up mb-[160px]">
              <Location
                selectedLocation={selectedLocation}
                onLocationClick={handleLocationClick}
              />
            </div>
          </div>
          <ConfirmButton
            isChecked={selectedLocation.length > 0}
            onClick={handleConfirmClick}
            disabled={selectedLocation.length === 0}
          >
            다음
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};
