import { Modal } from "@/components/common/Modal";
import { ClacoBookType } from "../../../ClacoBook";

export type DeleteModalProps = {
  clacoBook: ClacoBookType;
  onClose: () => void;
  onConfirm: (clacoBookId: number) => void;
};

export const DeleteClacoBookModal = ({
  clacoBook,
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  return (
    <Modal
      positiveButtonText="삭제"
      negativeButtonText="취소"
      onNegativeButtonClick={onClose}
      onPositiveButtonClick={() => onConfirm(clacoBook.id!)}
    >
      <div className="flex flex-col items-center justify-center mb-[30px]">
        <span className="mb-2 headline2-bold">
          정말 이 티켓북을 삭제하시겠어요?
        </span>
        <span className="text-center caption-12 text-grayscale-70">
          지금 삭제하시면 기록된 모든 내용이 삭제되며 <br />
          삭제된 내용은 복구되지 않습니다.
        </span>
      </div>
    </Modal>
  );
};
