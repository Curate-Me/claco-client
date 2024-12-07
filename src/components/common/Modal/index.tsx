import { ModalProps } from "@/types";

export const Modal = ({
  title,
  children,
  positiveButtonText,
  negativeButtonText,
  onPositiveButtonClick,
  onNegativeButtonClick,
  disabled,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#111111] bg-opacity-80 z-[9999]">
      <div className="relative bg-grayscale-20 pt-5 pb-[30px] px-5 rounded-[5px] min-w-[342px]">
        <div className="pt-[5px] text-center headline2-bold text-grayscale-80">
          {title}
        </div>
        <div className="mt-[23px]">{children && <>{children}</>}</div>
        <div className="w-[302px] flex items-center justify-between gap-[10px]">
          <button
            onClick={onNegativeButtonClick}
            className="w-[146px] rounded-[5px] bg-grayscale-30 px-auto py-[14px] body1-medium text-grayscale-70 text-center"
          >
            {negativeButtonText}
          </button>
          <button
            onClick={onPositiveButtonClick}
            className={`w-[146px] rounded-[5px] bg-primary px-auto py-[14px] body1-medium text-white text-center ${disabled ? "opacity-30" : ""}`}
            disabled={disabled}
          >
            {positiveButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
