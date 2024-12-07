import { ShowFilterTabProps, TabMenuItem } from "@/types";

const TEB_MENU: TabMenuItem[] = [
  { value: null, label: "전체" },
  { value: "서양음악(클래식)", label: "클래식" },
  { value: "무용", label: "무용" },
];

export const ShowFilterTab = ({
  activeTab,
  onTabClick,
  className = "",
}: ShowFilterTabProps) => {
  return (
    <div
      className={`flex justify-center bg-grayscale-20 rounded-[5px] items-center w-full ${className}`}
    >
      {TEB_MENU.map((tab, index) => (
        <button
          key={index}
          className={`body2-medium py-[7px] rounded-[5px] flex-1 ${
            activeTab === tab.value
              ? "bg-grayscale-80 text-grayscale-30"
              : "bg-grayscale-20 text-grayscale-60"
          }`}
          onClick={() => onTabClick(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
