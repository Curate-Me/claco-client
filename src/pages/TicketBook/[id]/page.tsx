import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ReactComponent as DownLoad } from "@/assets/svgs/DownLoadBox.svg";
import { ReactComponent as DotsThree } from "@/assets/svgs/dotsthree.svg";
import { ReactComponent as Plus } from "@/assets/svgs/plus.svg";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { createRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Toast } from "@/libraries/toast/Toast";
import { MoveModal } from "@/components/Ticket/Modal/Move";
import { DeleteClacoTicketModal } from "@/components/Ticket/Modal/Delete/ClacoTicket";
import { DownLoadModal } from "@/components/Ticket/Modal/DownLoad";
import { useGetClacoBookList, useGetClacoTicketList } from "@/hooks/queries";
import { ClacoBookList, ClacoTicketListResult } from "@/types";
import showReview from "@/assets/images/showReview.png";
import { useDeleteClacoTicket, usePutMoveClacoTicket } from "@/hooks/mutation";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeferredLoading } from "@/hooks/utils";
import { useQueryClient } from "@tanstack/react-query";

export const ClacoBookDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get("title");
  const { id } = useParams();
  const [ticketRefs, setTicketRefs] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);
  const [clacoTicket, setClacoTicket] = useState<ClacoTicketListResult[]>();
  const [currentClacoBook, setCurrentClacoBook] = useState<string>("");
  const [selectTicketIndex, setSelectTicketIndex] = useState<number>(0);
  const [selectClacoBook, setSelectClacoBook] = useState<ClacoBookList>({
    id: 0,
    title: "",
    color: "",
  });
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [actionState, setActionState] = useState<
    "move" | "delete" | "download"
  >();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const { data: clacoBookData } = useGetClacoBookList();
  const { data: clacoTicketData, isLoading } = useGetClacoTicketList(
    Number(id)
  );

  const { mutate: moveClacoTicket } = usePutMoveClacoTicket();
  const { mutate: deleteClacoTicket } = useDeleteClacoTicket();

  useEffect(() => {
    if (clacoTicketData?.result.ticketList && !isLoading) {
      setClacoTicket(clacoTicketData.result.ticketList);

      setTicketRefs(
        clacoTicketData.result.ticketList.map(() =>
          createRef<HTMLImageElement>()
        )
      );
    }
  }, [clacoTicketData, isLoading]);

  useEffect(() => {
    setCurrentClacoBook(value as string);
  }, [value]);

  const gotoBack = () => {
    localStorage.removeItem("prevTicketBookId");
    localStorage.removeItem("prevClacoBookTitle");
    navigate("/ticketbook");
  };

  const gotoTicketDetail = (tId: number) => {
    localStorage.setItem("prevTicketBookId", String(id));
    localStorage.setItem("prevClacoBookTitle", currentClacoBook);
    queryClient.invalidateQueries({ queryKey: ["ticketReviewDetail", tId] });
    navigate(`/ticket/${tId}`);
  };

  const gotoTicketCreate = () => {
    localStorage.setItem("clacoBookId", id?.toString() || "");
    navigate("/ticketcreate/search");
  };

  const onDownloadBtn = async () => {
    if (!ticketRefs[selectTicketIndex]?.current) return;

    try {
      const canvas = await html2canvas(ticketRefs[selectTicketIndex].current!, {
        scale: 2,
        backgroundColor: "#1C1C1C",
        useCORS: true,
        allowTaint: true,
      });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          console.log(ticketRefs[selectTicketIndex].current);
          saveAs(blob, "MyClacoTicket.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  const handleModalOpen = (action: "move" | "delete" | "download") => {
    const condition =
      clacoBookData?.result.clacoBookList
        .filter((book) => book.title !== value)
        .map((book) => book.title).length === 0;

    if (action === "move" && condition) {
      setToast(true);
      setMessage("티켓을 이동할 클라코북이 없어요");
      setIsSetting(false);
      return;
    }
    setActionState(action);
    setIsSetting(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    if (actionState === "move") {
      const clacoBookId = selectClacoBook.id;
      const ticketReviewId = clacoTicket && clacoTicket[selectTicketIndex].id;
      moveClacoTicket(
        {
          clacoBookId: clacoBookId as number,
          ticketReviewId: ticketReviewId as number,
        },
        {
          onSuccess: () => {
            setMessage("티켓이 이동이 완료되었어요");
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    } else if (actionState === "delete") {
      const ticketReviewId = clacoTicket && clacoTicket[selectTicketIndex].id;
      deleteClacoTicket(ticketReviewId as number, {
        onSuccess: () => {
          setMessage("티켓이 삭제되었어요");
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } else {
      onDownloadBtn();
    }
    setIsModalOpen(false);
    setToast(true);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setSelectTicketIndex(swiper.activeIndex);
  };

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  if (shouldShowSkeleton) {
    return (
      <div className="relative flex flex-col pt-[46px] items-center justify-center px-6">
        <div className="flex justify-center items-center w-full mb-[56px] h-[26px]">
          <Skeleton className="w-[86px] h-[36px]" />
        </div>
        <Skeleton className="w-[241px] h-[531px]" />
      </div>
    );
  }

  if (!isLoading && clacoTicket?.length === 0) {
    return (
      <>
        <div className="relative flex flex-col pt-[46px] items-center justify-center px-6">
          <div className="flex justify-center items-center w-full mb-[56px] h-[26px] relative">
            <BackArrow
              width="8"
              height="15"
              viewBox="0 0 11 20"
              className="absolute left-0 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <span className="text-center headline2-bold text-grayscale-80">
              {currentClacoBook}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center mt-[100px]">
            <span className="heading2-bold text-grayscale-80">
              공연은 즐겁게 관람하셨나요?
            </span>
            <div className="relative flex items-center justify-center">
              <img
                src={showReview}
                alt="showReview"
                className="object-contain mb-[53px]"
              />
              <div className="absolute bottom-0 flex text-center">
                <span className="body2-regular text-grayscale-70 mb-[39px]">
                  티켓북에 공연 감상을 등록하고
                  <br />
                  나만의 티켓을 만들어보세요!
                </span>
              </div>
            </div>
          </div>
          <div
            className="absolute -bottom-[130px] right-[26px] w-[70px] h-[70px] bg-primary rounded-full flex justify-center items-center"
            onClick={gotoTicketCreate}
          >
            <Plus viewBox="0 0 22 22" width={40} height={40} />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="relative flex flex-col pt-[46px] items-center justify-center px-6">
      <div className="flex justify-between items-center w-full mb-[56px] h-[26px]">
        <div className="w-[56px]">
          <BackArrow onClick={gotoBack} />
        </div>
        <span className="headline2-bold text-grayscale-80">
          {currentClacoBook}
        </span>
        <div className="flex space-x-[21px] w-[56px]">
          {clacoTicket?.length !== 0 && (
            <>
              <DownLoad onClick={() => handleModalOpen("download")} />
              <DotsThree onClick={() => setIsSetting(true)} />
            </>
          )}
        </div>
      </div>

      {/* 티켓 이동, 삭제 드롭박스 */}
      {isSetting ? (
        <>
          <div
            className="absolute top-0 w-screen h-screen bg-[#111111] opacity-80 z-10"
            onClick={() => setIsSetting(false)}
          />
          <div className="absolute top-[85px] right-[23px] bg-grayscale-20 px-[19px] py-[14px] rounded-[5px] z-20">
            <ul className="flex flex-col space-y-[14px] body2-medium text-grayscale-80">
              <li onClick={() => handleModalOpen("move")}>티켓 이동하기</li>
              <li onClick={() => handleModalOpen("delete")}>티켓 삭제하기</li>
            </ul>
          </div>
        </>
      ) : null}

      <div className="clacobook pb-[185px]">
        <>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            spaceBetween={213}
            onSlideChange={handleSlideChange}
            onSwiper={(swiper) => {
              setSelectTicketIndex(swiper.activeIndex);
            }}
            className="max-w-[240px] h-[569px] rounded-[5px] flex justify-center items-center"
          >
            {clacoTicket &&
              clacoTicket.map((image, index) => (
                <SwiperSlide key={index}>
                  <div ref={ticketRefs[index]}>
                    <img
                      src={image.ticketImage}
                      alt="클라코 티켓 이미지"
                      className="w-[240px] h-[530px]"
                      onClick={() => gotoTicketDetail(image.id)}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </>

        <div
          className="absolute bottom-[120px] right-[26px] w-[70px] h-[70px] bg-primary rounded-full flex justify-center items-center"
          onClick={gotoTicketCreate}
        >
          <Plus viewBox="0 0 22 22" width={40} height={40} />
        </div>
      </div>

      {/* 모달 컴포넌트 영역 */}
      {isModalOpen && (
        <>
          {actionState === "move" ? (
            <MoveModal
              clacoBookList={
                clacoBookData?.result.clacoBookList.filter(
                  (book) => book.title !== value
                ) ?? []
              }
              onClose={handleCloseModal}
              onConfirm={handleConfirm}
              onSelect={setSelectClacoBook}
            />
          ) : actionState === "delete" ? (
            <DeleteClacoTicketModal
              onClose={handleCloseModal}
              onConfirm={handleConfirm}
            />
          ) : (
            <DownLoadModal
              onClose={handleCloseModal}
              onConfirm={handleConfirm}
            />
          )}
        </>
      )}

      {/* 토스트 영역 */}
      {toast && <Toast setToast={setToast} message={message} />}
    </div>
  );
};
