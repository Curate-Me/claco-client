import { ReactComponent as Required } from "@/assets/svgs/required.svg";
import { ReviewTag } from "@/components/common/ReviewTag";
import { ReviewQuestionProps } from "@/types";

export const ReviewQuestions = ({
  selectedSoundTag,
  setSelectedSoundTag,
  selectedSeatTag1,
  setSelectedSeatTag1,
  selectedSeatTag2,
  setSelectedSeatTag2,
  selectedSightTag,
  setSelectedSightTag,
  selectedAccessibilityTag,
  setSelectedAccessibilityTag,
  placeCategories,
}: ReviewQuestionProps) => {
  const soundPlaces = placeCategories.slice(0, 2);
  const seatPlaces1 = placeCategories.slice(2, 4);
  const seatPlaces2 = placeCategories.slice(4, 6);
  const sightPlaces = placeCategories.slice(6, 8);
  const accessibilityPlaces = placeCategories.slice(8, 10);

  const handlePlaceClick = (
    place: string,
    setSelectedPlace: (value: string | null) => void,
  ) => {
    setSelectedPlace(place);
  };

  return (
    <div className="flex flex-col">
      {/* 음향 */}
      <div className="flex flex-col mt-[40px]">
        <div className="flex">
          <span className="headline2-bold text-grayscale-80">
            Q. 음향은 어땠나요?
          </span>
          <Required />
        </div>
        <div className="flex flex-wrap mt-5 gap-2">
          {soundPlaces.map((place) => (
            <ReviewTag
              key={place.placeCategoryId}
              onClick={() =>
                handlePlaceClick(place.categoryName, setSelectedSoundTag)
              }
              isSelected={selectedSoundTag === place.categoryName}
              isPlace={true}
            >
              {place.categoryName}
            </ReviewTag>
          ))}
        </div>
      </div>

      {/* 좌석 */}
      <div className="flex flex-col mt-[40px]">
        <div className="flex">
          <span className="headline2-bold text-grayscale-80">
            Q. 좌석은 어땠나요?
          </span>
          <Required />
        </div>
        <div className="flex gap-2 mt-5">
          {seatPlaces1.map((place) => (
            <ReviewTag
              key={place.placeCategoryId}
              onClick={() =>
                handlePlaceClick(place.categoryName, setSelectedSeatTag1)
              }
              isSelected={selectedSeatTag1 === place.categoryName}
              isPlace={true}
            >
              {place.categoryName}
            </ReviewTag>
          ))}
        </div>
        <div className="flex gap-2 mt-[10px]">
          {seatPlaces2.map((place) => (
            <ReviewTag
              key={place.placeCategoryId}
              onClick={() =>
                handlePlaceClick(place.categoryName, setSelectedSeatTag2)
              }
              isSelected={selectedSeatTag2 === place.categoryName}
              isPlace={true}
            >
              {place.categoryName}
            </ReviewTag>
          ))}
        </div>
      </div>

      {/* 시야 */}
      <div className="flex flex-col mt-[40px]">
        <div className="flex">
          <span className="headline2-bold text-grayscale-80">
            Q. 시야는 어땠나요?
          </span>
          <Required />
        </div>
        <div className="flex flex-wrap mt-5 gap-2">
          {sightPlaces.map((place) => (
            <ReviewTag
              key={place.placeCategoryId}
              onClick={() =>
                handlePlaceClick(place.categoryName, setSelectedSightTag)
              }
              isSelected={selectedSightTag === place.categoryName}
              isPlace={true}
            >
              {place.categoryName}
            </ReviewTag>
          ))}
        </div>
      </div>

      {/* 접근성 */}
      <div className="flex flex-col mt-[40px]">
        <div className="flex">
          <span className="headline2-bold text-grayscale-80">
            Q. 접근성은 어땠나요?
          </span>
          <Required />
        </div>
        <div className="flex flex-wrap mt-5 gap-2">
          {accessibilityPlaces.map((place) => (
            <ReviewTag
              key={place.placeCategoryId}
              onClick={() =>
                handlePlaceClick(
                  place.categoryName,
                  setSelectedAccessibilityTag,
                )
              }
              isSelected={selectedAccessibilityTag === place.categoryName}
              isPlace={true}
            >
              {place.categoryName}
            </ReviewTag>
          ))}
        </div>
      </div>
    </div>
  );
};
