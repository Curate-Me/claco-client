import { FeatureButton } from "@/components/Onboarding/Registration";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { features } from "./const";
import { useUserStore } from "@/libraries/store/user";
import { useOnboardingStore } from "@/libraries/store/onboarding";
import { submitUserInformation } from "@/apis";

export const SelectFeaturePage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progressValue, setProgressValue] = useState<number>(55.55);
  const nickname = useUserStore((state) => state.nickname);
  const addFeature = useOnboardingStore((state) => state.addCategoryPreference);
  const removeLastCategoryPreference = useOnboardingStore(
    (state) => state.removeLastCategoryPreference
  );
  const removeSpecificCategoryPreference = useOnboardingStore(
    (state) => state.removeSpecificCategoryPreference
  );
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const {
    gender,
    age,
    minPrice,
    maxPrice,
    regionPreferences,
    typePreferences,
    categoryPreferences,
  } = useOnboardingStore();

  const navigate = useNavigate();

  const handleBackClick = () => {
    if (currentStep === 0) {
      navigate("/create/concept");
    } else {
      removeLastCategoryPreference();
      setCurrentStep(currentStep - 2);
    }
    setProgressValue((prevValue) => Math.min(prevValue - 11.11, 100));
  };

  const handleFeatureClick = (feature: string) => {
    setSelectedFeature(feature);

    if (progressValue !== 99.99) {
      setIsWaiting(true);
      setTimeout(() => {
        if (currentStep < features.length - 2) {
          setCurrentStep((prevStep) => prevStep + 2);
          addFeature(feature);
          setSelectedFeature(null);
          setProgressValue((prevValue) => Math.min(prevValue + 11.11, 100));
        }
        setIsWaiting(false);
      }, 500);
    } else {
      if (
        !categoryPreferences.includes("친숙한") &&
        !categoryPreferences.includes("새로운")
      ) {
        addFeature(feature);
      } else {
        if (feature === "친숙한" || feature === "새로운") {
          if (categoryPreferences.includes("친숙한") && feature !== "친숙한") {
            removeSpecificCategoryPreference("친숙한");
          }
          if (categoryPreferences.includes("새로운") && feature !== "새로운") {
            removeSpecificCategoryPreference("새로운");
          }
        }

        if (!categoryPreferences.includes(feature)) {
          addFeature(feature);
        }
      }
    }
  };

  const handleNextClick = async () => {
    const onboardingRequest = {
      nickname: nickname,
      gender,
      age,
      minPrice,
      maxPrice,
      regionPreferences: regionPreferences.map((region) => ({
        preferenceRegion: region,
      })),
      typePreferences: typePreferences.map((type) => ({
        preferenceType: type,
      })),
      categoryPreferences: categoryPreferences.map((category) => ({
        preferenceCategory: category,
      })),
    };

    try {
      const response = await submitUserInformation(onboardingRequest);
      console.log(response);
      navigate("/create/complete");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto bg-background-dark">
      <div className="flex flex-col flex-grow w-full h-auto px-[24px] pt-[4.75rem] pb-[4.56rem] gap-[0.5rem]">
        <div className="flex flex-col gap-[2.44rem]">
          <div className="flex-col">
            <BackArrow className="mb-[1.19rem]" onClick={handleBackClick} />
            <Progress value={progressValue} />
          </div>
          <span className="heading1-bold text-grayscale-90">
            {nickname}님 취향에 맞는
            <br />
            클래식 공연을 추천드릴게요
          </span>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-[1.56rem]">
            <span className="body1-medium text-grayscale-60">
              선호하는 클래식 공연의 특징을 선택해주세요.
            </span>
            <div
              key={currentStep}
              className="flex flex-col gap-[15px] mb-[107px] slide-up"
            >
              {features.slice(currentStep, currentStep + 2).map((feature) => (
                <FeatureButton
                  key={feature.title}
                  isChecked={selectedFeature === feature.title}
                  onClick={() => handleFeatureClick(feature.title)}
                  className="flex items-center p-[19px]"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-[122px] h-[122px] mr-[14px] p-2 object-contain"
                  />
                  <div className="flex flex-col text-left">
                    <span className="mb-1 heading1-bold">{feature.title}</span>
                    <span className="caption-13 text-grayscale-60">
                      {feature.description.map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </span>
                  </div>
                </FeatureButton>
              ))}
            </div>
          </div>

          <ConfirmButton
            isChecked={!!selectedFeature && progressValue === 99.99}
            onClick={handleNextClick}
            disabled={!selectedFeature || isWaiting}
          >
            다음
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};
