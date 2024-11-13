import { Progress } from "@/components/ui/progress";

import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { Profile } from "@/components/common/Profile";
import { useState } from "react";

export const SelectProfilePage = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate("/create");
  };

  const handleConfirmClick = () => {
    navigate("/create/location");
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-background-dark flex flex-col">
      <div className="flex flex-col flex-grow w-full h-auto px-[24px] pt-[4.75rem] gap-[0.5rem] pb-[4.56rem]">
        <div className="flex flex-col gap-[2.44rem]">
          <div className="flex-col">
            <BackArrow className="mb-[1.19rem]" onClick={handleBackClick} />
            <Progress value={11.11} />
          </div>
          <span className="heading1-bold text-grayscale-90">
            맞춤 공연 추천 전,
            <br />
            울랄라님에 대해 알려주세요
          </span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex-col">
            <span className="body1-medium text-grayscale-60">
              성별과 연령대를 알려주세요.
            </span>
            <div className="slide-up">
              <Profile
                selectedGender={selectedGender}
                selectedAge={selectedAge}
                onGenderSelect={setSelectedGender}
                onAgeSelect={setSelectedAge}
              />
            </div>
          </div>
          <ConfirmButton
            isChecked={!!selectedGender && !!selectedAge}
            onClick={handleConfirmClick}
            disabled={!(selectedGender && selectedAge)}
          >
            다음
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};
