import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { Nickname } from "@/components/common/Nickname";
import usePutUserInfo from "@/hooks/mutation/usePutUserInfo";
import useGetUserInfo from "@/hooks/queries/useGetUserInfo";
import { useUserStore } from "@/libraries/store/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserEditPage = () => {
  const setNickname = useUserStore((state) => state.setNickname);
  const [nickname, setLocalNickname] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [initialProfileImage, setInitialProfileImage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo();
  const userInfoData = userInfo?.result;
  const { mutate: uploadUserInfo } = usePutUserInfo();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfoData) {
      setLocalNickname(userInfoData.nickname);
      setInitialProfileImage(userInfoData.imageUrl);
    }
  }, [userInfoData, isUserInfoLoading]);

  const handleConfirmClick = () => {
    try {
      uploadUserInfo(
        {
          updateNickname: nickname,
          updateImage: profileImage,
        },
        {
          onSuccess: (data) => {
            setInitialProfileImage(
              `${data.result.imageUrl}?timestamp=${Date.now()}`,
            );
            setNickname(nickname);
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setProfileImage(file);
    }
  };

  const gotoBack = () => {
    navigate("/mypage");
  };

  if (isUserInfoLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className="px-[24px] pt-[46px] flex flex-col h-screen justify-between pb-[100px]">
      <div className="flex-col">
        <div className="relative flex items-center justify-center mb-[41px]">
          <BackArrow
            className="absolute top-0 left-0 cursor-pointer"
            onClick={gotoBack}
          />
          <span className="headline2-bold text-grayscale-80">프로필 설정</span>
        </div>
        <div className="flex flex-col gap-[18px] mb-12">
          <span className="headline1-bold text-grayscale-90">내 정보</span>
          <div className="flex gap-5">
            <div className="rounded-full bg-grayscale-30 mb-4">
              {profileImage ? (
                <img
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : initialProfileImage
                  }
                  alt="Profile Preview"
                  className="w-[84px] h-[84px] max-w-[84px] max-h-[84px] rounded-full object-cover"
                />
              ) : (
                <img
                  src={initialProfileImage}
                  alt="Profile Preview"
                  className="w-[84px] h-[84px] max-w-[84px] max-h-[84px] rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="headline2-bold text-white mb-[10px]">
                {userInfoData?.nickname}
              </span>
              <label className="w-fit flex items-center justify-center text-center px-[14px] py-[6px] border border-grayscale-70 rounded-[5px] mb-2 cursor-pointer">
                <span className="caption-12 text-center text-grayscale-80">
                  프로필 이미지 업로드
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <span className="caption-12 text-grayscale-60">
                *10MB 이내의 이미지 파일을 업로드 해주세요.
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="headline1-bold text-grayscale-90">닉네임 설정</span>
          <Nickname
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            setNickname={setLocalNickname}
          />
        </div>
      </div>
      <ConfirmButton
        isChecked={true}
        onClick={handleConfirmClick}
        className="w-full"
      >
        적용하기
      </ConfirmButton>
    </div>
  );
};
