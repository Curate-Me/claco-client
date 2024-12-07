import { TypeButton } from "@/components/Onboarding/Registration";
import { LocationProps } from "@/types";

const AREA_LIST = [
  { value: ["서울특별시"], label: "서울" },
  { value: ["경기도"], label: "경기" },
  { value: ["인천광역시"], label: "인천" },
  { value: ["강원도"], label: "강원" },
  { value: ["충청북도", "충청남도"], label: "충청" },
  { value: ["전라북도", "전라남도"], label: "전라" },
  { value: ["경상북도", "경상남도"], label: "경상" },
  { value: ["제주특별자치도"], label: "제주" },
];

export const Location = ({
  selectedLocation,
  onLocationFilterClick,
  onLocationClick,
  isFilter = false,
}: LocationProps) => {
  const handleClick = (location: { value: string[]; label: string }) => {
    if (isFilter) {
      onLocationFilterClick?.(location.value, location.label);
    } else {
      onLocationClick?.(location.label);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-[0.63rem]">
      {AREA_LIST.map((location, index) => (
        <TypeButton
          key={index}
          isChecked={
            !isFilter
              ? selectedLocation?.includes(location.label)
              : location.value.every((v) => selectedLocation?.includes(v))
          }
          onClick={() => handleClick(location)}
        >
          {location.label}
        </TypeButton>
      ))}
    </div>
  );
};
