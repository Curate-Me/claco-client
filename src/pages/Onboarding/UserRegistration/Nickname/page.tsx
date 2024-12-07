import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "@/components/common/Button";
import { Nickname } from "@/components/common/Nickname";
import { useUserStore } from "@/libraries/store/user";

export const NicknameCreatePage = () => {
  const setNickname = useUserStore((state) => state.setNickname);
  const [localNickname, setLocalNickname] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    if (isChecked) {
      setNickname(localNickname);
      navigate("/create/profile");
    }
  };
  const handleBackClick = () => {
    navigate("/tos");
  };
  return (
    <div className="w-full h-screen overflow-y-auto bg-background-dark">
      <div className="flex flex-col flex-grow w-full h-full justify-between px-[24px] pt-[4.75rem] pb-[4.56rem]">
        <div className="flex-col">
          <BackArrow className="mb-[3.12rem]" onClick={handleBackClick} />
          <span className="heading1-bold text-grayscale-80">
            사용하실 닉네임을 알려주세요
          </span>
          <div className="flex flex-col mt-[1.62rem] gap-[0.81rem]">
            <Nickname
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              setNickname={setLocalNickname}
            />
          </div>
        </div>
        <ConfirmButton
          isChecked={isChecked}
          onClick={handleConfirmClick}
          disabled={!isChecked}
        >
          확인
        </ConfirmButton>
      </div>
    </div>
  );
};
