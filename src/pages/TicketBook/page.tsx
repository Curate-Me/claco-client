import showReview from "@/assets/images/showReview.png";
import { ReactComponent as Plus } from "@/assets/svgs/plus.svg";
import { ReactComponent as Trash } from "@/assets/svgs/trash.svg";
import { ReactComponent as Edit } from "@/assets/svgs/Edit.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { ClacoBook, ClacoBookType } from "@/components/Ticket/ClacoBook";
import { CreateEditModal } from "@/components/Ticket/Modal/CreateEdit";
import { DeleteClacoBookModal } from "@/components/Ticket/Modal/Delete/ClacoBook";
import { Toast } from "@/libraries/toast/Toast";
import { useNavigate } from "react-router-dom";
import useGetClacoBookList from "@/hooks/queries/useGetClacoBookList";

import {
  useDeleteClacoBook,
  usePostCreateClacoBook,
  usePutEditClacoBook,
} from "@/hooks/mutation";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeferredLoading } from "@/hooks/utils";
import { useQueryClient } from "@tanstack/react-query";

export const ClacoBookPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<string>("");
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [selectClacoBook, setSelectClacoBook] = useState<ClacoBookType | null>(
    null
  );

  const { data, isLoading } = useGetClacoBookList();
  useEffect(() => {
    if (data && !isLoading) {
      setSelectClacoBook(data.result.clacoBookList[0]);
    }
  }, [data, isLoading, setSelectClacoBook]);
  const clacoBookList = Array.isArray(data?.result?.clacoBookList)
    ? data?.result?.clacoBookList
    : [];

  const { mutate: createClacoBook } = usePostCreateClacoBook();
  const { mutate: deleteClacoBook } = useDeleteClacoBook();
  const { mutate: editClacoBook } = usePutEditClacoBook();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCreate = (newData: ClacoBookType) => {
    createClacoBook(
      {
        id: null,
        title: newData.title,
        color: newData.color,
      },
      {
        onSuccess: (res) => {
          setIsEditing(false);
          setToast(true);
          if (res.code === "COM-000") {
            setMessage("클라코북 추가가 완료되었어요");
            setIsModalOpen(false);
          } else if (res.code === "CLB-010") {
            setMessage("클라코북은 최대 5개까지만 보유할 수 있어요");
            setIsModalOpen(false);
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const handleConfirmEdit = (newData: ClacoBookType) => {
    editClacoBook(
      {
        id: newData.id,
        title: newData.title,
        color: newData.color,
      },
      {
        onSuccess: (res) => {
          setIsEditing(false);
          setToast(true);
          if (res.code === "COM-000") {
            setMessage("클라코북 수정이 완료되었어요");
            setIsModalOpen(false);
          } else if (res.code === "CLB-001") {
            setMessage("클라코북을 수정하는데 실패했어요");
            setIsModalOpen(false);
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const handleDelete = (clacoBookId: number) => {
    deleteClacoBook(clacoBookId, {
      onSuccess: () => {
        setIsModalOpen(false);
        setToast(true);
        setMessage("클라코북 삭제가 완료되었어요");
        setIsEditing(false);
      },
    });
  };

  const handleButtonClick = (action: string) => {
    setAction(action);
    if (action !== "add") setIsEditing(true);
    else handleOpenModal();
  };

  const handleClacoBookDetail = (id: number, title: string) => {
    queryClient.invalidateQueries({ queryKey: ["clacoTicketList", id] });
    queryClient.invalidateQueries({ queryKey: ["recommend-clacoticket"] });

    navigate(`/ticketbook/${id}?title=${title}`);
  };

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  // 데이터 로딩 중일 때는 스켈레톤 UI
  if (shouldShowSkeleton) {
    return (
      <div className="flex flex-col pt-[46px] items-center justify-center px-6">
        <div className="mb-[56px]">
          <span className="headline2-bold text-grayscale-80 mb-[152px] h-[26px]">
            티켓북
          </span>
        </div>
        <div className="flex flex-col gap-[22px]">
          {Array.from(Array(5).keys()).map((_, index) => (
            <Skeleton key={index} className="w-[342px] h-[212px]" />
          ))}
        </div>
      </div>
    );
  }

  // 데이터 로딩이 완료되고 데이터가 없을 때만 빈 상태 UI
  if (!isLoading && clacoBookList.length === 0) {
    return (
      <div className="flex flex-col pt-[46px] items-center justify-center px-6">
        <span className="headline2-bold text-grayscale-80 mb-[152px] h-[26px]">
          티켓북
        </span>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
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

            <a
              href="/ticketcreate/search"
              className="rounded-[5px] px-[89px] py-[14px] text-center bg-grayscale-30 text-grayscale-80 cursor-pointer"
            >
              나만의 티켓 만들러 가기
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-[46px] items-center justify-center px-6">
      {clacoBookList.length === 0 ? (
        <span className="headline2-bold text-grayscale-80 mb-[152px] h-[26px]">
          티켓북
        </span>
      ) : (
        <div className="flex justify-between items-center w-full mb-[56px] h-[26px]">
          <div className="w-[56px]">
            {isEditing ? (
              <div
                className="w-[56px] body1-medium text-left"
                onClick={() => setIsEditing(false)}
              >
                취소
              </div>
            ) : (
              <Plus
                width={40}
                height={40}
                viewBox="0 0 22 22"
                onClick={() => handleButtonClick("add")}
              />
            )}
          </div>
          <span className="headline2-bold text-grayscale-80">티켓북</span>
          {isEditing ? (
            <div
              className="w-[56px] body1-medium text-right"
              onClick={handleOpenModal}
            >
              선택
            </div>
          ) : (
            <div className="flex space-x-[21px] w-[56px]">
              <Trash onClick={() => handleButtonClick("delete")} />
              <Edit onClick={() => handleButtonClick("edit")} />
            </div>
          )}
        </div>
      )}
      <>
        <div className="pb-[100px]">
          <RadioGroup
            defaultValue={String(selectClacoBook?.id)}
            className="flex flex-col gap-[35px]"
          >
            {clacoBookList.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  if (!isEditing) {
                    handleClacoBookDetail(book.id as number, book.title);
                  }
                }}
              >
                <ClacoBook data={book} isEditing={isEditing}>
                  <RadioGroupItem
                    value={String(book.id)}
                    id={String(book.id)}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setSelectClacoBook(book);
                    }}
                  />
                </ClacoBook>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 모달 영역 */}
        {isModalOpen && (
          <>
            {action === "delete" && selectClacoBook ? (
              <DeleteClacoBookModal
                clacoBook={selectClacoBook}
                onClose={handleCloseModal}
                onConfirm={handleDelete}
              />
            ) : (
              <CreateEditModal
                clacoBook={action === "edit" ? selectClacoBook : null}
                action={action}
                onClose={handleCloseModal}
                onConfirm={
                  action == "add" ? handleConfirmCreate : handleConfirmEdit
                }
              />
            )}
          </>
        )}

        {/* 토스트 영역 */}
        {toast && <Toast setToast={setToast} message={message} />}
      </>
    </div>
  );
};
