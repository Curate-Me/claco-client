import { refreshToken } from "@/apis";
import { useUserStore } from "@/libraries/store/user";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const AfterOnBoardingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("token");
  const nickname = searchParams.get("nickname")!;
  const setNickname = useUserStore((state) => state.setNickname);

  useEffect(() => {
    const handleAfterOnboarding = async () => {
      try {
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        localStorage.setItem("accessToken", accessToken);
        await refreshToken();
        setNickname(nickname);
        navigate("/main");
      } catch (error) {
        console.error(error);
        localStorage.clear();
      }
    };

    handleAfterOnboarding();
  }, [accessToken, nickname, setNickname, navigate]);

  return <>온보딩 진행 완료된 사용자</>;
};
