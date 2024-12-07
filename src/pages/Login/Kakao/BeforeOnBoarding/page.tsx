import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const BeforeOnBoardingPage = () => {
  const navigate = useNavigate();
  //온보딩 로그인 시 사용할 토큰 url에서 받아오기
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("token");

  //온보딩 과정에서 사용할 액세스 토큰 로컬 스토리지에 저장
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      navigate("/tos");
    }
  }, [accessToken, navigate]);

  return <>온보딩 진행 중...</>;
};
