import { refreshToken } from "@/apis";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const BeforeOnBoardingPage = () => {
  const navigate = useNavigate();
  //온보딩 로그인 시 사용할 토큰 url에서 받아오기
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("token");

  //온보딩 과정에서 사용할 액세스 토큰 로컬 스토리지에 저장
  useEffect(() => {
    const handleOnboarding = async () => {
      try {
        if (!accessToken) {
          console.error("No access token found");
          navigate("/");
          return;
        }

        localStorage.setItem("accessToken", accessToken);
        await refreshToken();
        navigate("/tos");
      } catch (error) {
        console.error(error);
        localStorage.clear();
        navigate("/");
      }
    };

    handleOnboarding();
  }, [accessToken, navigate]);

  return <>온보딩 진행 중...</>;
};
