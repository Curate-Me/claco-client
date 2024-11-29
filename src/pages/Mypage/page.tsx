import { ReactComponent as Edit } from "@/assets/svgs/Edit.svg";
import { ReactComponent as Settings } from "@/assets/svgs/settings.svg";
import { LikedShow } from "@/components/Mypage/LikedShow";
import { PreferenceAnalysis } from "@/components/Mypage/PreferenceAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import useGetUserInfo from "@/hooks/queries/useGetUserInfo";
import { useDeferredLoading } from "@/hooks/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState("나의 취향 분석");
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserInfo();
  const userInfoData = data?.result;
  const tabs = ["나의 취향 분석", "좋아요한 공연"];

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  useEffect(() => {
    if (!isLoading && userInfoData) {
      console.log(userInfoData);
    }
  }, [userInfoData, isLoading]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const gotoUserSettings = () => {
    window.scrollTo({ top: 0 });
    navigate("/mypage/user");
  };

  if (isLoading || shouldShowSkeleton) {
    return (
      <div className="pt-[41px] px-[24px] pb-[110px] min-h-screen relative">
        <div className="flex flex-col relative items-center justify-center">
          <Skeleton className="w-[86px] h-[36px] mb-[44px]" />
          <Skeleton className="w-[84px] h-[84px] rounded-full mb-[11px]" />
          <Skeleton className="mb-[27px] w-[86px] h-[36px]" />

          <div className="flex mb-[37px] gap-[58px]">
            <Skeleton className="w-[118px] h-[36px]" />
            <Skeleton className="w-[118px] h-[36px]" />
          </div>

          <div className="flex flex-col items-left">
            <Skeleton className="w-[146px] h-[36px] mb-[5px]" />
            <Skeleton className="w-[342px] h-[36px] mb-[50px]" />
          </div>

          <Skeleton className="w-[157px] h-[157px] mb-[29px]" />

          <div className="grid grid-cols-5 gap-[22px] mb-[8px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-[48px] h-[48px]" />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-[22px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-[48px] h-[18px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-[24px] pt-[46px] pb-[52px]">
      <div className="flex flex-col">
        <div className="relative items-center text-center mb-[49px]">
          <span className="headline2-bold text-grayscale-80">마이페이지</span>
          <Settings className="absolute top-0 right-0 " />
        </div>
        <div className="flex flex-col items-center justify-center mb-[37px] relative">
          <div className="relative rounded-full bg-grayscale-30 mb-4">
            <img
              src={userInfoData?.imageUrl}
              alt="Profile Preview"
              className="w-[84px] h-[84px] max-w-[84px] max-h-[84px] rounded-full object-cover"
            />
            <div
              className="absolute cursor-pointer -bottom-3 -right-3 p-[11px] rounded-full bg-dark"
              onClick={gotoUserSettings}
            >
              <Edit />
            </div>
          </div>

          <span className="headline2-bold text-white">
            {userInfoData?.nickname}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mb-[23px]">
        <div className="relative flex w-full justify-between mb-[14px] px-9">
          {tabs.map((tab) => (
            <span
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`text-center cursor-pointer pb-2 ${
                selectedTab === tab
                  ? "headline2-bold text-white px-[17px] border-b-2 border-grayscale-80 z-10"
                  : "headline2-bold text-grayscale-60 px-[17px] border-b-2 border-grayscale-30"
              }`}
            >
              {tab}
            </span>
          ))}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-grayscale-30" />
        </div>
      </div>
      {selectedTab === "나의 취향 분석" ? (
        <PreferenceAnalysis />
      ) : (
        <LikedShow />
      )}
    </div>
  );
};
