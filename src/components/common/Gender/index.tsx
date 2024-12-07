import { TypeButton } from "@/components/Onboarding/Registration";
import { GenderProps } from "@/types";

export const Gender = ({ selectedGender, onGenderSelect }: GenderProps) => {
  const genderOptions = [
    { label: "남성", value: "MALE" },
    { label: "여성", value: "FEMALE" },
  ];

  return (
    <div className="grid grid-cols-2 gap-[0.62rem]">
      {genderOptions.map((gender) => (
        <TypeButton
          key={gender.value}
          isChecked={selectedGender === gender.value}
          onClick={() => onGenderSelect(gender.value)}
        >
          {gender.label}
        </TypeButton>
      ))}
    </div>
  );
};
