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
import {
  ClacoBookList,
  ClacoTicketListResult,
  ClacoTicketProps,
} from "@/types";
import { ClacoTicket } from "@/components/common/ClacoTicket";

// import TEST1 from "@/assets/images/Genre/classical.png";
// import TEST2 from "@/assets/images/Genre/delicate.png";
// import TEST3 from "@/assets/images/Genre/familiar.png";
// import TEST4 from "@/assets/images/Genre/lyrical.png";
// import TEST5 from "@/assets/images/Genre/romantic.png";
import TEST6 from "@/assets/images/Genre/dynamic.png";
import TEST7 from "@/assets/images/Genre/grand.png";
import TEST8 from "@/assets/images/Genre/modern.png";
import TEST9 from "@/assets/images/Genre/novel.png";
import TEST10 from "@/assets/images/Genre/tragic.png";
import { usePutMoveClacoTicket } from "@/hooks/mutation";
import useDeleteClacoTicket from "@/hooks/mutation/useDeleteClacoTicket";

const dummyClacoTicket: ClacoTicketProps = {
  watchDate: "2024-03-24",
  concertName: "이지 하우스 콘서트: EZ HOUSE CONCERT [경산]",
  concertTags: [
    {
      iconUrl: TEST6,
      tagName: "현대적인",
    },
    {
      iconUrl: TEST7,
      tagName: "웅장한",
    },
    {
      iconUrl: TEST8,
      tagName: "새로운",
    },
    {
      iconUrl: TEST9,
      tagName: "비극적인",
    },
    {
      iconUrl: TEST10,
      tagName: "역동적인",
    },
  ],
};

export const ClacoBookDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get("title");
  const { id } = useParams();
  const [clacoTicket, setClacoTicket] = useState<ClacoTicketListResult[]>();
  const [ticketRefs, setTicketRefs] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);
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
    navigate(-1);
  };

  const gotoTicketDetail = (tId: number) => {
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
      // console.log(ticketReviewId);
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
          <DownLoad onClick={() => handleModalOpen("download")} />
          <DotsThree onClick={() => setIsSetting(true)} />
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
          {clacoTicket?.length === 0 ? (
            <>
              {/* 티켓 레이아웃 테스트를 위한 코드 */}
              <SwiperSlide>
                <div ref={ticketRefs[0]}>
                  <ClacoTicket
                    watchDate={dummyClacoTicket.watchDate}
                    concertName={dummyClacoTicket.concertName}
                    concertTags={dummyClacoTicket.concertTags}
                  />
                </div>
              </SwiperSlide>
            </>
          ) : (
            <>
              {" "}
              {clacoTicket &&
                clacoTicket.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div ref={ticketRefs[index]}>
                      <img
                        src={`${image.ticketImage}?timestamp=${Date.now()}`}
                        alt="클라코 티켓 이미지"
                        className="w-[240px] h-[530px]"
                        crossOrigin="anonymous"
                        onClick={() => gotoTicketDetail(image.id)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </>
          )}
        </Swiper>
      </div>
      <div
        className="absolute bottom-[57px] right-[26px] w-[70px] h-[70px] bg-primary rounded-full flex justify-center items-center"
        onClick={gotoTicketCreate}
      >
        <Plus viewBox="0 0 22 22" width={40} height={40} />
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
