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
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setNickname(nickname);
      navigate("/main");
    }
  }, [accessToken, nickname, setNickname, navigate]);

  return <>온보딩 진행 완료된 사용자</>;
};
