import { ConcertBased, ShowCategory } from "./show";

export type CategoryMap = {
  category: string;
  imageURL: string;
};

export type ConcertInfo = {
  id: number;
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
  poster: string;
  genrenm: string;
  prfstate: string;
  categories: CategoryMap[];
  liked: boolean;
  recommendationConcertsResponseV1s?: ConcertBased[];
};

export type GetConcertListProps = {
  genre: "서양음악(클래식)" | "무용" | null;
  page: number;
  size: number;
};

export type GetConcertListResponse = {
  code: string;
  message: string;
  result: {
    listPageResponse: ConcertInfo[];
    totalCount: number;
    size: number;
    currentPage: number;
    totalPage: number;
  };
  refreshed: boolean;
};

export type GetConcertInfiniteResponse = {
  pageParams: number[];
  pages: GetConcertListResponse[];
};

export type AutoCompleteSearchCard = {
  id: number;
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  genrenm: string;
};

export type AutoCompleteSearchResponse = {
  code: string;
  message: string;
  result: AutoCompleteSearchCard[];
  refreshed: boolean;
};

export type ShowSummaryCardProps = {
  data: ConcertInfo;
};

export type SearchCardProps = {
  data: AutoCompleteSearchCard;
  searchKeyWord?: string;
  className?: string;
  onClick?: () => void;
};

export type GetSearchProps = {
  query: string;
  page?: number;
  size?: number;
  genre?: string;
};

export type GetConcertFiltersProps = {
  minPrice?: number;
  maxPrice?: number;
  area?: string[];
  startDate?: string;
  endDate?: string;
  page: number;
  size: number;
  categories?: string[];
};

export type GetLikedConcertListResult = {
  id: number;
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  genrenm: string;
  prfstate: string;
  poster: string;
  fcltynm: string;
  liked: boolean;
  categories: ShowCategory[];
};

export type GetLikedConcertListResponse = {
  code: string;
  message: string;
  result: GetLikedConcertListResult[];
  refreshed: boolean;
};

export type FilterValue = {
  minPrice: number;
  maxPrice: number;
  selectedLocation: string[];
  startDate: string;
  endDate: string;
  categories: string[];
};
