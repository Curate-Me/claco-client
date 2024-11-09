import { Progress } from "@/components/ui/progress";

import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { useState } from "react";
import { Gender } from "@/components/common/Gender";
import { Age } from "@/components/common/Age";

export const SelectProfilePage = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate("/create");
  };

  const handleConfirmClick = () => {
    navigate("/create/price");
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
            울랄라님의 취향에 맞는
            <br />
            클래식 공연을 알아볼까요?
          </span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex-col">
            <span className="body1-medium text-grayscale-60">
              성별과 연령대를 알려주세요.
            </span>

            <div className="slide-up">
              <div className="flex flex-col gap-[0.87rem] mt-[2.12rem] mb-[2.88rem]">
                <span className="body1-medium text-grayscale-80">성별</span>
                <Gender
                  selectedGender={selectedGender}
                  onGenderSelect={setSelectedGender}
                />
              </div>
              <div className="flex flex-col gap-[0.87em] mb-[56px]">
                <span className="body1-medium text-grayscale-80">연령대</span>
                <Age selectedAge={selectedAge} onAgeSelect={setSelectedAge} />
              </div>
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
