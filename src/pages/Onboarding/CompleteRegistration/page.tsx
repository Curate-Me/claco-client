import { ReactComponent as CompletePreference } from "@/assets/svgs/CompletePreference.svg";
import { useEffect, useState } from "react";
import { ConfirmButton } from "@/components/common/Button";
import LottieData from "@/assets/lotties/onboarding-loading.json";
import Lottie from "react-lottie-player";
import { useUserStore } from "@/libraries/store/user";

export const CompleteRegistrationPage = () => {
  const [showLoading, setShowLoading] = useState(true);
  const nickname = useUserStore((state) => state.nickname);

  const handleLogin = () => {
    localStorage.removeItem("user-onboarding-storage");
    window.location.replace(`${import.meta.env.VITE_LOGIN_SERVER_URL}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-background-dark">
      {showLoading ? (
        <div className="flex flex-col w-full h-full pt-[144px] relative">
          <span className="heading1-bold text-grayscale-90 px-[24px]">
            클라코가 {nickname}님의
            <br />
            클래식 공연 취향을 분석중이에요
          </span>
          <Lottie
            loop
            animationData={LottieData}
            play
            className="w-full absolute top-[-50px]"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-between w-full px-[24px] h-full pt-[144px] pb-[73px]">
          <span className="heading1-bold text-grayscale-90 mb-[88px]">
            클라코와 함께 클래식 경험을 넓혀줄
            <br />
            여정을 시작해보세요!
          </span>
          <div className="flex items-center justify-center mb-[127px]">
            <CompletePreference />
          </div>
          <ConfirmButton isChecked={true} onClick={handleLogin}>
            맞춤 공연 보러가기
          </ConfirmButton>
        </div>
      )}
    </div>
  );
};
