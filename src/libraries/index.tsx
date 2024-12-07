import { PropsWithChildren, useEffect } from "react";

import ReactQuerySetting from "@/libraries/reactQuery/ReactQuerySetting";

const setScreenHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export default function AppContainer({ children }: PropsWithChildren) {
  useEffect(() => {
    setScreenHeight();

    window.addEventListener("resize", setScreenHeight);
    return () => window.removeEventListener("resize", setScreenHeight);
  }, []);

  return (
    <div className="mx-auto max-w-[450px] min-h-real-screen bg-[#1C1C1C] text-grayscale-80">
      <ReactQuerySetting>{children}</ReactQuerySetting>
    </div>
  );
}
