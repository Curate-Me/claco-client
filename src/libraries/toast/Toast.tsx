import { useEffect, useState } from "react";

export type ToastProps = {
  message: string;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Toast = ({ message, setToast }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    const removeTimer = setTimeout(() => {
      setToast(false);
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [setToast]);

  return (
    <div
      className={`fixed bottom-[80px] z-[9999] flex h-[55px] w-[342px] items-center justify-center rounded-[5px] bg-grayscale-30 transition-all duration-500 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0 translate-y-2"}`}
    >
      <p className="text-[#ECEBE7] body2-semibold">{message}</p>
    </div>
  );
};
