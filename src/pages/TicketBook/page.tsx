import showReview from "@/assets/images/showReview.png";
import { ReactComponent as Plus } from "@/assets/svgs/plus.svg";
import { ReactComponent as Trash } from "@/assets/svgs/trash.svg";
import { ReactComponent as Edit } from "@/assets/svgs/Edit.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { ClacoBook, ClacoBookType } from "@/components/Ticket/ClacoBook";
import { CreateEditModal } from "@/components/Ticket/Modal/CreateEdit";
import { DeleteModal } from "@/components/Ticket/Modal/Delete";
import { Toast } from "@/libraries/toast/Toast";

const CLACO_BOOK_MOCK_DATA = [
  { id: 1, title: "조성진 모음집", color: "#DD6339" },
  { id: 2, title: "2024 발레", color: "#D499B8" },
  { id: 3, title: "시요밍보따리", color: "#9E8D8E" },
];

export const ClacoBookPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<string>("");
  const [toast, setToast] = useState(false);
  const [selectClacoBook, setSelectClacoBook] = useState<ClacoBookType>(
    CLACO_BOOK_MOCK_DATA[0]
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (newData: ClacoBookType) => {
    console.log(newData);
    setIsModalOpen(false);
    setIsEditing(false);
    setToast(true);
  };

  const handleDelete = (clacoBookId: number) => {
    console.log(clacoBookId);
    setIsModalOpen(false);
    setToast(true);
    setIsEditing(false);
  };

  const handleButtonClick = (action: string) => {
    console.log(action);
    console.log(selectClacoBook);

    setAction(action);
    if (action !== "add") setIsEditing(true);
    else handleOpenModal();
  };

  return (
    <div className="flex flex-col pt-[46px] items-center justify-center px-6">
      {CLACO_BOOK_MOCK_DATA.length === 0 ? (
        <span className="headline2-bold text-grayscale-80 mb-[152px] h-[26px]">
          클라코북
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
          <span className="headline2-bold text-grayscale-80">클라코북</span>
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

      {CLACO_BOOK_MOCK_DATA.length !== 0 ? (
        <>
          <div className="pb-[100px]">
            <RadioGroup defaultValue={"1"} className="flex flex-col gap-[35px]">
              {CLACO_BOOK_MOCK_DATA.map((book) => (
                <ClacoBook key={book.id} data={book} isEditing={isEditing}>
                  <RadioGroupItem
                    value={String(book.id)}
                    id={String(book.id)}
                    onClick={() => setSelectClacoBook(book)}
                  />
                </ClacoBook>
              ))}
            </RadioGroup>
          </div>

          {/* 모달 영역 */}
          {isModalOpen && (
            <>
              {action === "delete" ? (
                <DeleteModal
                  clacoBook={selectClacoBook}
                  onClose={handleCloseModal}
                  onConfirm={handleDelete}
                />
              ) : (
                <CreateEditModal
                  clacoBook={action === "edit" ? selectClacoBook : null}
                  action={action}
                  onClose={handleCloseModal}
                  onConfirm={handleConfirm}
                />
              )}
            </>
          )}

          {/* 토스트 영역 */}
          {toast && (
            <Toast
              setToast={setToast}
              message={
                action === "add"
                  ? "클라코북 추가 완료"
                  : action === "edit"
                    ? "클라코북 수정이 완료되었어요"
                    : "클라코북 삭제가 완료되었어요"
              }
            />
          )}
        </>
      ) : (
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
                클라코북에 공연 후기를 등록하고
                <br />
                나만의 티켓을 공유해보세요!
              </span>
            </div>
          </div>

          <a
            href="/ticketbook/ticket/search"
            className="rounded-[5px] px-[89px] py-[14px] text-center bg-grayscale-30 text-grayscale-80 cursor-pointer"
          >
            공연 후기 등록하기
          </a>
        </div>
      )}
    </div>
  );
};