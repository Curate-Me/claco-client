import { PropsWithChildren, useEffect } from "react";
import { RecoilRoot } from "recoil";
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
    <div className="mx-auto max-w-[420px] min-h-real-screen bg-white">
      <ReactQuerySetting>
        <RecoilRoot>{children}</RecoilRoot>
      </ReactQuerySetting>
    </div>
  );
}
