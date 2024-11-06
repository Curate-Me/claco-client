export type ModalProps = {
  isDualButton: boolean;
  positiveButtonText?: string;
  negativeButtonText?: string;
  singleButtonText?: string;
  onPositiveButtonClick?: () => void;
  onNegativeButtonClick?: () => void;
  onSingleButtonClick?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
};
