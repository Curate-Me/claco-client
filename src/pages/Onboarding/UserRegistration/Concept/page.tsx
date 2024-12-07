import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { Concept } from "@/components/common/Concept";
import { useState } from "react";
import { useUserStore } from "@/libraries/store/user";
import { useOnboardingStore } from "@/libraries/store/onboarding";

export const SelectConceptPage = () => {
  const navigate = useNavigate();
  const nickname = useUserStore((state) => state.nickname);
  const setConcept = useOnboardingStore((state) => state.setTypePreferences);
  const [selectedConcept, setSelectedConcept] = useState<string[]>([]);

  const handleBackClick = () => {
    navigate("/create/price");
  };

  const handleConfirmClick = () => {
    if (selectedConcept) setConcept(selectedConcept);
    navigate("/create/feature");
  };

  const handleConceptClick = (concept: string) => {
    setSelectedConcept((prevSelectedConcept) =>
      prevSelectedConcept.includes(concept)
        ? prevSelectedConcept.filter((con) => con !== concept)
        : [...prevSelectedConcept, concept],
    );
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-background-dark flex flex-col">
      <div className="flex flex-col flex-grow w-full h-auto px-[24px] pt-[4.75rem] pb-[4.56rem] gap-[0.5rem]">
        <div className="flex flex-col gap-[2.44rem]">
          <div className="flex-col">
            <BackArrow className="mb-[1.19rem]" onClick={handleBackClick} />
            <Progress value={44.44} />
          </div>
          <span className="heading1-bold text-grayscale-90">
            {nickname}님 취향에 맞는
            <br />
            클래식 공연을 추천드릴게요
          </span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-[1.56rem] mb-[166px]">
            <span className="body1-medium text-grayscale-60">
              선호하는 클래식 공연 유형을 모두 선택해주세요.
            </span>
            <div className="slide-up">
              <Concept
                selectedConcept={selectedConcept}
                onConceptClick={handleConceptClick}
              />
            </div>
          </div>
          <ConfirmButton
            isChecked={selectedConcept.length > 0}
            onClick={handleConfirmClick}
            disabled={selectedConcept.length === 0}
          >
            다음
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};
