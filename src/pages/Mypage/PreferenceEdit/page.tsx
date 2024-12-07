import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { Age } from "@/components/common/Age";
import { ConfirmButton } from "@/components/common/Button";
import { Concept } from "@/components/common/Concept";
import { Gender } from "@/components/common/Gender";
import { Location } from "@/components/common/Location";
import { Price } from "@/components/common/Price";
import usePutUserPreference from "@/hooks/mutation/usePutUserPreference";
import { useGetUserPreferences } from "@/hooks/queries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PreferenceEditPage = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const { data, isLoading } = useGetUserPreferences();
  const preferenceData = data?.result;
  const { mutate: uploadPreference } = usePutUserPreference();

  useEffect(() => {
    if (!isLoading && preferenceData) {
      setSelectedGender(preferenceData.gender);
      setSelectedAge(preferenceData.age);
      setMinPrice(preferenceData.minPrice);
      setMaxPrice(preferenceData.maxPrice);
      setSelectedLocation(
        preferenceData.preferRegions.map((region) => region.preferenceRegion)
      );
      setSelectedConcepts(
        preferenceData.preferTypes.map((type) => type.preferenceType)
      );
    }
  }, [isLoading, data]);

  const navigate = useNavigate();

  const handleGenderClick = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleAgeClick = (age: number) => {
    setSelectedAge(age);
  };

  const handleLocationClick = (location: string) => {
    setSelectedLocation((prev) => {
      if (prev.includes(location)) {
        return prev.filter((loc) => loc !== location);
      }
      return [...prev, location];
    });
  };

  const handleConceptClick = (concept: string) => {
    if (selectedConcepts.includes(concept)) {
      setSelectedConcepts(selectedConcepts.filter((item) => item !== concept));
    } else if (selectedConcepts.length < 5) {
      setSelectedConcepts([...selectedConcepts, concept]);
    }
  };

  const handleConfirmClick = () => {
    const requestPayload = {
      gender: selectedGender || "",
      age: selectedAge || 10,
      minPrice: minPrice,
      maxPrice: maxPrice,
      regionPreferences: selectedLocation.map((location) => ({
        preferenceRegion: location,
      })),
      typePreferences: selectedConcepts.map((concept) => ({
        preferenceType: concept,
      })),
    };

    try {
      uploadPreference(requestPayload);
    } catch (error) {
      console.error(error);
    }
  };

  const gotoBack = () => {
    navigate("/mypage");
  };

  return (
    <div className="px-[24px] pt-[46px] pb-[100px]">
      <div className="relative flex items-center justify-center">
        <BackArrow
          className="absolute left-0 cursor-pointer"
          onClick={gotoBack}
        />
        <span className="headline2-bold text-grayscale-80">
          나의 취향 정보 수정
        </span>
      </div>
      <div className="mt-[57px] mb-[51px]">
        <div className="flex flex-col gap-[0.87rem] mt-[2.12rem] mb-[2.88rem]">
          <span className="headline1-bold text-grayscale-80">성별</span>
          <Gender
            selectedGender={selectedGender}
            onGenderSelect={handleGenderClick}
          />
        </div>
        <div className="flex flex-col gap-[0.87em] mb-[51px]">
          <span className="headline1-bold text-grayscale-80">연령대</span>
          <Age selectedAge={selectedAge} onAgeSelect={handleAgeClick} />
        </div>
      </div>
      <div className="mb-[51px]">
        <span className="headline1-bold text-grayscale-90">가격</span>
        <Price
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />
      </div>
      <div className="mb-[51px]">
        <span className="headline1-bold text-grayscale-90 mb-[32px] block">
          공연장 위치
        </span>
        <Location
          selectedLocation={selectedLocation}
          onLocationClick={handleLocationClick}
          isFilter={false}
        />
      </div>
      <div className="mb-[74px]">
        <span className="headline1-bold text-grayscale-90 mb-[32px] block">
          공연 유형
        </span>
        <Concept
          selectedConcept={selectedConcepts}
          onConceptClick={handleConceptClick}
        />
      </div>
      <ConfirmButton
        isChecked={
          !!selectedGender &&
          !!selectedAge &&
          !!selectedLocation &&
          !!selectedConcepts
        }
        onClick={() => {
          handleConfirmClick();
        }}
        disabled={
          !(
            selectedGender &&
            selectedAge &&
            selectedLocation &&
            selectedConcepts
          )
        }
        className="w-full"
      >
        적용하기
      </ConfirmButton>
    </div>
  );
};
