import { Swiper as SwiperType } from "swiper";

export type ModalProps = {
  title?: string;
  children?: React.ReactNode;
  positiveButtonText: string;
  negativeButtonText: string;
  disabled?: boolean;
  onPositiveButtonClick?: () => void;
  onNegativeButtonClick?: () => void;
};

export type UseThumbnailModalReturn = {
  thumbsSwiper: SwiperType | null;
  isThumbnailShow: boolean;
  isAnimating: boolean;
  selectIndex: SelectThumbnail;
  setThumbsSwiper: (swiper: SwiperType | null) => void;
  setSelectIndex: (index: SelectThumbnail) => void;
  handleImageClick: () => void;
};

export type SelectThumbnail = {
  page: number;
  index: number;
};
