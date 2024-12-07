export type Show = {
  id: number;
  posterImage: string;
  showType: string;
  status: string;
  defaultLiked: boolean;
  title: string;
  location: string;
  date: string;
  keywords: string[];
  isLiked: boolean;
};

export type UseSearchAndFilterProps = {
  initialShowData: Show[];
  activeTab: string;
};

export type ShowFilterProps = {
  onClose: () => void;
  onApply: (
    price: string,
    location: string,
    date: string,
    feature: string
  ) => void;
};

export type ClacoPickProps = {
  pickData: ConcertBased[];
};

export type ClacoPickShowProps = {
  imageSrc: string;
  title: string;
};

export type TabMenuItem = {
  value: TabMenu;
  label: string;
};

export type TabMenu = "서양음악(클래식)" | "무용" | null;

export type ShowFilterTabProps = {
  activeTab: TabMenu;
  onTabClick: (tab: TabMenu) => void;
  className?: string;
};

export type ShowDetailCheckResponse = {
  code: string;
  message: string;
  result: ShowDetailResult;
};

export type TicketSimpleReview = {
  ticketReviewId: number;
  nickname: string;
  starRate: number;
  content: string;
};

export type ShowCategory = {
  category: string;
  imageURL: string;
};

export type ShowDetailResult = {
  id: number;
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
  poster: string;
  area: string;
  genrenm: string;
  openrun: string;
  prfstate: string;
  prfcast: string;
  prfruntime: string;
  prfage: string;
  pcseguidance: string;
  updatedate: string;
  dtguidance: string;
  styurl: string;
  ticketReviewSimpleResponses: TicketSimpleReview[];
  summary: string;
  categories: ShowCategory[];
  liked: boolean;
};

export type DaysMapType = {
  day: string;
  dayIndex: number;
};

export type PricesMapType = {
  [seat: string]: string | number;
};

export type ConcertBased = {
  id: number;
  prfnm: string;
  poster: string;
  genrenm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
};

export type ConcertBasedResponse = {
  code: string;
  message: string;
  result: ConcertBased[];
  refreshed: boolean;
};

export type GetConcertReviewSizeResponse = {
  code: string;
  message: string;
  result: {
    total: number;
  };
  refreshed: boolean;
};
