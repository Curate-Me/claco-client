import { TypeButton } from "@/components/Onboarding/Registration";
import { AgeProps } from "@/types";

export const Age = ({ selectedAge, onAgeSelect }: AgeProps) => {
  const ageOptions = [
    { label: "10대", value: 10 },
    { label: "20대", value: 20 },
    { label: "30대", value: 30 },
    { label: "40대", value: 40 },
    { label: "50대", value: 50 },
    { label: "60대 이상", value: 60 },
  ];

  return (
    <div className="grid grid-cols-2 gap-[0.62rem]">
      {ageOptions.map((age) => (
        <TypeButton
          key={age.value}
          isChecked={selectedAge === age.value}
          onClick={() => onAgeSelect(age.value)}
        >
          {age.label}
        </TypeButton>
      ))}
    </div>
  );
};
