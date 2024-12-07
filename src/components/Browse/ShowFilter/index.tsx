import { ReactComponent as Refresh } from "@/assets/svgs/refresh.svg";
import { ReactComponent as X } from "@/assets/svgs/X-icon.svg";
import { ConfirmButton } from "@/components/common/Button";
import { Location } from "@/components/common/Location";
import { Price } from "@/components/common/Price";
import { useEffect, useState } from "react";
import { ShowFeatureFilter } from "./ShowFeatureFilter";
import { ShowFilterProps } from "@/types";
import { Calendar } from "@/components/common/Calendar";

const features = [
  "웅장한",
  "섬세한",
  "친숙한",
  "새로운",
  "고전적인",
  "현대적인",
  "낭만적인",
  "비극적인",
  "서정적인",
  "역동적인",
];

export const ShowFilter = ({ onClose, onApply }: ShowFilterProps) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const savedFilter = localStorage.getItem("filterObj");
    if (savedFilter) {
      const parsedFilter = JSON.parse(savedFilter);
      setMinPrice(parsedFilter.minPrice || 0);
      setMaxPrice(parsedFilter.maxPrice || 1000000);
      setSelectedLocation(parsedFilter.selectedLocation || []);
      setSelectedFeatures(parsedFilter.categories || []);
      setRangeStart(
        parsedFilter.startDate ? new Date(parsedFilter.startDate) : null
      );
      setRangeEnd(parsedFilter.endDate ? new Date(parsedFilter.endDate) : null);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 1000);
  };

  const handleApply = () => {
    const priceRange = `${minPrice}~${maxPrice}원`;
    const location = selectedLocation.join(", ");
    let dateRange = "";
    if (rangeStart && rangeEnd) {
      const startYear = rangeStart.getFullYear();
      const startMonth = String(rangeStart.getMonth() + 1).padStart(2, "0");
      const startDate = String(rangeStart.getDate()).padStart(2, "0");

      const endYear = rangeEnd.getFullYear();
      const endMonth = String(rangeEnd.getMonth() + 1).padStart(2, "0");
      const endDate = String(rangeEnd.getDate()).padStart(2, "0");

      dateRange = `${startYear}.${startMonth}.${startDate}~${endYear}.${endMonth}.${endDate}`;
    }

    const feature = selectedFeatures.join(", ");
    setIsVisible(false);
    setTimeout(() => onApply(priceRange, location, dateRange, feature), 300);

    const [startDate, endDate] = dateRange.split("~");
    const filterObj = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      selectedLocation: selectedLocation,
      startDate: startDate,
      endDate: endDate,
      categories: selectedFeatures,
    };
    // console.log(filterObj);

    localStorage.setItem("filterObj", JSON.stringify(filterObj));
  };

  const handleLocationClick = (values: string[], label: string) => {
    console.log(label);
    if (values.every((value) => selectedLocation.includes(value))) {
      setSelectedLocation(
        selectedLocation.filter((loc) => !values.includes(loc))
      );
    } else {
      setSelectedLocation([...selectedLocation, ...values]);
    }
  };

  const handleFeatureClick = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else if (selectedFeatures.length < 5) {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleRefreshClick = () => {
    setMinPrice(0);
    setMaxPrice(1000000);
    setSelectedLocation([]);
    setSelectedFeatures([]);
    setRangeStart(null);
    setRangeEnd(null);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative px-6 pt-[46px] pb-[100px] max-w-[450px] w-full h-[90vh] 
          bg-[#1c1c1c] overflow-y-auto transform transition-transform duration-1000 ease-out
          ${isVisible ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex items-center justify-between mb-10">
          <Refresh
            width="18"
            height="18"
            viewBox="0 0 14 14"
            onClick={handleRefreshClick}
          />
          <span className="headline2-bold text-grayscale-80">필터 설정</span>
          <X
            width="18"
            height="18"
            viewBox="0 0 16 16"
            className="text-white"
            onClick={handleClose}
          />
        </div>
        <div className="mb-[55px]">
          <span className="headline1-bold text-grayscale-90">가격</span>
          <Price
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>
        <div className="mb-[71px]">
          <span className="headline1-bold text-grayscale-90 mb-[32px] block">
            공연장 위치
          </span>
          <Location
            selectedLocation={selectedLocation}
            onLocationFilterClick={handleLocationClick}
            isFilter={true}
          />
        </div>
        <div className="flex flex-col mb-[58px] gap-8">
          <span className="headline1-bold text-grayscale-90">공연 날짜</span>
          <Calendar
            mode="range"
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onRangeSelect={(start, end) => {
              setRangeStart(start);
              setRangeEnd(end);
            }}
          />
        </div>
        <div className="mb-[38px]">
          <div className="flex flex-col gap-[7px] mb-[27px]">
            <span className="headline1-bold text-grayscale-90">공연 특성</span>
            <span className="caption-12 text-grayscale-60">
              *최대 5개까지 선택 가능해요
            </span>
          </div>
          <div className="grid grid-cols-3 gap-[10px]">
            {features.map((feature) => (
              <ShowFeatureFilter
                key={feature}
                isChecked={selectedFeatures.includes(feature)}
                onClick={() => handleFeatureClick(feature)}
              >
                {feature}
              </ShowFeatureFilter>
            ))}
          </div>
        </div>
        <ConfirmButton
          isChecked={true}
          onClick={handleApply}
          className={`w-full ${minPrice === 0 && maxPrice === 0 && selectedFeatures.length === 0 && selectedLocation.length === 0 && rangeStart === null && rangeEnd === null ? "opacity-30" : ""}`}
          disabled={
            minPrice === 0 &&
            maxPrice === 0 &&
            selectedFeatures.length === 0 &&
            selectedLocation.length === 0 &&
            rangeStart === null &&
            rangeEnd === null
          }
        >
          적용하기
        </ConfirmButton>
      </div>
    </div>
  );
};
