import { Modal } from "@/components/common/Modal";
import { ClacoBookType } from "../../ClacoBook";
import { useEffect, useState } from "react";

export type CreateEditModalProps = {
  clacoBook?: ClacoBookType | null;
  action: string;
  onClose: () => void;
  onConfirm: (newData: ClacoBookType) => void;
};

export const CreateEditModal = ({
  clacoBook,
  action,
  onClose,
  onConfirm,
}: CreateEditModalProps) => {
  const [id, setId] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [colorState, setColorState] = useState<string>("");

  useEffect(() => {
    if (clacoBook) {
      setId(clacoBook.id!);
      setTitle(clacoBook.title);
      setColorState(clacoBook.color);
    }
  }, [clacoBook]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Modal
      title={`클라코북 ${action === "add" ? "추가" : "수정"}`}
      positiveButtonText="확인"
      negativeButtonText="취소"
      onNegativeButtonClick={onClose}
      onPositiveButtonClick={() =>
        onConfirm({
          id: id ?? null,
          title: title,
          color: colorState,
        })
      }
      disabled={title.length === 0 || colorState.trim().length === 0}
    >
      <div className="flex flex-col items-center justify-center mb-[30px] space-y-[21px]">
        <div className="flex flex-col items-center justify-center w-full space-y-2">
          <div className="body1-medium text-[#F1EFEF] text-left w-full">
            이름
          </div>
          <div className="flex bg-grayscale-30 rounded-[0.44rem] p-[1.06rem] w-full">
            <input
              className="w-full outline-none bg-grayscale-30 body2-medium text-grayscale-80"
              value={title}
              onChange={handleInputChange}
              maxLength={14}
            />
            <span className="caption-12 tracking-[-0.015rem] self-center text-grayscale-60">
              {title.length}/15
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full space-y-2">
          <div className="body1-medium text-[#F1EFEF] text-left w-full">
            색상
          </div>
          <div className="flex items-center justify-center gap-[7px] w-[302px]">
            <div
              className={`w-[96px] h-[38px] rounded-[5px] bg-[#DD6339] ${colorState === "#DD6339" ? "border-[1px] border-grayscale-80" : ""}`}
              onClick={() => setColorState("#DD6339")}
            />
            <div
              className={`w-[96px] h-[38px] rounded-[5px] bg-[#D499B8] ${colorState === "#D499B8" ? "border-[1px] border-grayscale-80" : ""}`}
              onClick={() => setColorState("#D499B8")}
            />
            <div
              className={`w-[96px] h-[38px] rounded-[5px] bg-[#9E8D8E] ${colorState === "#9E8D8E" ? "border-[1px] border-grayscale-80" : ""}`}
              onClick={() => setColorState("#9E8D8E")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
