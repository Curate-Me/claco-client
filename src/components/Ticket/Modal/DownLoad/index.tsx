import { Modal } from "@/components/common/Modal";

export type DownLoadModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export const DownLoadModal = ({ onClose, onConfirm }: DownLoadModalProps) => {
  return (
    <Modal
      positiveButtonText="확인"
      negativeButtonText="취소"
      onNegativeButtonClick={onClose}
      onPositiveButtonClick={onConfirm}
    >
      <div className="flex flex-col items-center justify-center mb-[30px]">
        <span className="mb-2 headline2-bold">이 티켓을 다운받으시겠어요?</span>
      </div>
    </Modal>
  );
};
