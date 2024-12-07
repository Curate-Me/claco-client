import { Progress } from "@/components/ui/progress";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ReactComponent as Required } from "@/assets/svgs/required.svg";
import { ReactComponent as Remove } from "@/assets/svgs/remove.svg";
import { ReactComponent as Plus } from "@/assets/svgs/plus.svg";
import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "@/components/common/Button";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/common/Calendar";
import { SearchCard } from "@/components/common/Search/Card";
import { Modal } from "@/components/common/Modal";
import useGetShowDetail from "@/hooks/queries/useGetShowDetail";
import extractShowTime from "@/hooks/utils/extractShowTime";
import { AutoCompleteSearchCard } from "@/types";
import { useDeferredLoading } from "@/hooks/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const TicketInfoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useGetShowDetail(
    JSON.parse(localStorage.getItem("showId") || '"'),
  );
  const showDetail = data?.result;
  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  const SHOW_DATA: AutoCompleteSearchCard = {
    id: showDetail?.id || 0,
    mt20id: showDetail?.mt20id || "",
    prfnm: showDetail?.prfnm || "",
    prfpdfrom: showDetail?.prfpdfrom || "",
    prfpdto: showDetail?.prfpdto || "",
    genrenm: showDetail?.genrenm || "",
  };

  const showTimesByDate = extractShowTime({
    prfpdfrom: showDetail?.prfpdfrom || "",
    prfpdto: showDetail?.prfpdto || "",
    dtguidance: showDetail?.dtguidance || "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<string | null>(null);
  const [availableShowTimes, setAvailableShowTimes] = useState<
    { time: string }[]
  >([]);
  const [seatValue, setSeatValue] = useState<string>("");
  const [castingList, setCastingList] = useState<string[]>([]);
  const [newCasting, setNewCasting] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const formatToYYYYMMDD = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatToYYYYMMDD(selectedDate);

  useEffect(() => {
    if (selectedDate) {
      const dateString = formatToYYYYMMDD(selectedDate);

      setAvailableShowTimes(showTimesByDate[dateString] || []);
      setSelectedShowTime(null);

      if (showDetail?.prfcast) {
        const castArray = showDetail.prfcast
          .split(",")
          .map((name) => name.trim());
        setCastingList(castArray);
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    setIsValid(selectedShowTime !== null && castingList.length > 0);
  }, [selectedShowTime, castingList]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    handleOpenModal();
  };

  const handleConfirmClick = () => {
    localStorage.setItem("poster", JSON.stringify(showDetail?.poster));
    localStorage.setItem("showDate", formattedDate);
    localStorage.setItem("showTime", JSON.stringify(selectedShowTime));
    localStorage.setItem("showPlace", JSON.stringify(showDetail?.fcltynm));
    localStorage.setItem("seat", JSON.stringify(seatValue));
    localStorage.setItem("castingList", JSON.stringify(castingList));
    navigate("/ticketcreate/review");
  };

  const handleShowTimeClick = (time: string) => {
    setSelectedShowTime(time);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSeatValue(value);
  };

  const handleAddCasting = () => {
    if (newCasting.trim() !== "") {
      setCastingList([...castingList, newCasting]);
      setNewCasting("");
      setIsAdding(false);
    }
  };

  const handleRemoveCasting = (index: number) => {
    setCastingList(castingList.filter((_, i) => i !== index));
  };

  const handleCloseCastingModal = () => {
    setIsAdding(false);
    setNewCasting("");
  };

  if (isLoading || shouldShowSkeleton) {
    return (
      <div className="relative flex flex-col min-h-screen px-[24px] pt-[46px] pb-[60px]">
        <div className="flex flex-col gap-[33px] mb-[37px]">
          <div className="relative flex items-center justify-center">
            <BackArrow
              width="9"
              height="18"
              viewBox="0 0 11 20"
              className="absolute left-0"
              onClick={handleBackClick}
            />
            <span className="headline2-bold text-grayscale-80">티켓 등록</span>
          </div>
          <Progress value={50} />
        </div>
        <Skeleton className="w-[342px] h-[84px] mb-[37px]" />
        <div className="flex mb-[27px]">
          <span className="headline2-bold text-grayscale-80">
            관람 날짜를 선택해주세요
          </span>
          <Required />
        </div>
        <Skeleton className="w-[342px] h-[323px] mb-[62px]" />
        <Skeleton className="w-[342px] h-[52px]" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen px-[24px] pt-[46px] pb-[60px]">
      <div className="flex flex-col gap-[33px]">
        <div className="relative flex items-center justify-center">
          <BackArrow
            width="9"
            height="18"
            viewBox="0 0 11 20"
            className="absolute left-0"
            onClick={handleBackClick}
          />
          <span className="headline2-bold text-grayscale-80">티켓 등록</span>
        </div>
        <Progress value={50} />
      </div>

      {isModalOpen && (
        <Modal
          positiveButtonText="확인"
          negativeButtonText="취소"
          onPositiveButtonClick={() => {
            localStorage.removeItem("clacoBookId");
            navigate("/ticketbook");
          }}
          onNegativeButtonClick={handleCloseModal}
        >
          <div className="flex flex-col items-center justify-center mt-[13px] mb-[30px]">
            <span className="headline2-bold text-grayscale-80">
              티켓 등록을 그만두시겠어요?
            </span>
            <span className="caption-12 text-grayscale-70">
              입력된 정보는 저장되지 않습니다
            </span>
          </div>
        </Modal>
      )}

      <div className="mt-[37px]">
        <SearchCard data={SHOW_DATA} />
        <div className="flex flex-col mt-[37px] mb-[62px] gap-[27px]">
          <div className="flex">
            <span className="headline2-bold text-grayscale-80">
              관람 날짜를 선택해주세요
            </span>
            <Required />
          </div>
          <Calendar
            startYear={
              showDetail?.prfpdfrom
                ? new Date(showDetail.prfpdfrom).getFullYear()
                : new Date().getFullYear()
            }
            startMonth={
              showDetail?.prfpdfrom
                ? new Date(showDetail.prfpdfrom).getMonth()
                : new Date().getMonth()
            }
            selectedDate={selectedDate}
            onDateSelect={(date) => setSelectedDate(date)}
            showTimesByDate={showTimesByDate}
          />
        </div>

        {selectedDate && (
          <>
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex">
                <span className="headline2-bold text-grayscale-80">
                  관람 회차를 선택해주세요
                </span>
                <Required />
              </div>
              <div className="grid grid-cols-2 gap-[10px]">
                {availableShowTimes.map((showTime) => (
                  <button
                    key={showTime.time}
                    onClick={() => handleShowTimeClick(showTime.time)}
                    className={`rounded-[5px] items-center justify-center py-[14px] px-[61px] ${
                      selectedShowTime === showTime.time
                        ? "bg-grayscale-80 text-grayscale-20"
                        : "bg-grayscale-30 text-grayscale-80"
                    }`}
                  >
                    <span className="body1-medium">{showTime.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 mb-10">
              <div className="flex">
                <span className="headline2-bold text-grayscale-80">공연장</span>
                <Required />
              </div>
              <div className="rounded-[7px] flex items-center gap-[10px] bg-grayscale-30 p-4">
                <span className="body2-medium text-grayscale-80">
                  {showDetail?.fcltynm}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 mb-10">
              <div className="flex items-center gap-1">
                <span className="headline2-bold text-grayscale-80">
                  관람 좌석을 입력해주세요
                </span>
                <span className="body2-medium text-grayscale-60">(선택)</span>
              </div>
              <div className="rounded-[7px] flex items-center gap-[10px] bg-grayscale-30 p-4">
                <input
                  value={seatValue}
                  className="flex w-full outline-none body2-medium text-grayscale-60 bg-grayscale-30"
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {selectedShowTime && (
          <div className="flex flex-col mb-10">
            <div className="flex mb-5">
              <span className="headline2-bold text-grayscale-80">
                캐스팅을 입력해주세요
              </span>
              <Required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {castingList.map((casting, index) => (
                <div
                  key={index}
                  className="flex items-center h-[52px] border border-grayscale-30 justify-between bg-grayscale-30 rounded-[7px] px-4"
                >
                  <div className="relative w-full overflow-hidden body2-medium text-grayscale-80 whitespace-nowrap">
                    {casting}
                    <div className="absolute top-0 right-0 w-8 h-full pointer-events-none bg-gradient-to-l from-grayscale-30 to-transparent"></div>
                  </div>
                  <button onClick={() => handleRemoveCasting(index)}>
                    <Remove />
                  </button>
                </div>
              ))}

              {isAdding ? (
                <Modal
                  positiveButtonText="확인"
                  negativeButtonText="취소"
                  onPositiveButtonClick={handleAddCasting}
                  onNegativeButtonClick={handleCloseCastingModal}
                  disabled={newCasting.trim() === ""}
                >
                  <div className="w-full flex flex-col items-center justify-center mt-[12.45px] mb-[37px] gap-[13.1px]">
                    <span className="headline2-bold text-grayscale-80">
                      캐스팅을 입력해주세요
                    </span>
                    <input
                      className="w-full h-[52px] rounded-[7px] text-center body2-medium text-grayscale-80 bg-grayscale-30 outline-none px-3"
                      value={newCasting}
                      onChange={(e) => setNewCasting(e.target.value)}
                    />
                  </div>
                </Modal>
              ) : (
                <button
                  onClick={() => setIsAdding(true)}
                  className="flex items-center justify-center h-[52px] bg-none border border-grayscale-30 rounded-[7px]"
                >
                  <Plus className="text-grayscale-80" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ConfirmButton
        isChecked={isValid}
        onClick={handleConfirmClick}
        disabled={!isValid}
      >
        다음
      </ConfirmButton>
    </div>
  );
};
