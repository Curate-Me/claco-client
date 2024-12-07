import { Modal } from "@/components/common/Modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClacoBookList } from "@/types";
import { useState } from "react";

export type MoveModalProps = {
  clacoBookList: ClacoBookList[];
  onClose: () => void;
  onConfirm: () => void;
  onSelect: React.Dispatch<React.SetStateAction<ClacoBookList>>;
};

export const MoveModal = ({
  clacoBookList,
  onClose,
  onConfirm,
  onSelect,
}: MoveModalProps) => {
  const [isMove, setIsMove] = useState<boolean>(false);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const handleConfirm = () => {
    if (isMove) {
      onConfirm();
    } else {
      setIsMove(true);
    }
  };
  return (
    <Modal
      positiveButtonText="확인"
      negativeButtonText="취소"
      onNegativeButtonClick={onClose}
      onPositiveButtonClick={handleConfirm}
      title={isMove ? "" : "티켓을 이동할 티켓북을 선택해주세요"}
      disabled={!isSelect}
    >
      {isMove ? (
        <div className="flex flex-col items-center justify-center mb-[30px]">
          <span className="mb-2 headline2-bold">
            선택하신 폴더로 티켓을 이동하시겠어요?
          </span>
        </div>
      ) : (
        <div className="flex flex-col mb-[25px]">
          <RadioGroup>
            {clacoBookList.map((item, index) => (
              <div className="flex items-center space-x-2 mb-[5px]" key={index}>
                <RadioGroupItem
                  value={item.title}
                  id={String(index)}
                  onClick={() => {
                    setIsSelect(true);
                    onSelect(item as ClacoBookList);
                  }}
                  className="mr-[10px] border-grayscale-50 text-grayscale-50"
                />
                <label htmlFor={String(index)}>{item.title}</label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </Modal>
  );
};
