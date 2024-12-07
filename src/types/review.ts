import { PlaceCategory, TagCategory } from "./category";

export type ReviewTagProps = {
  isPlace?: boolean;
  children: string;
  onClick?: () => void;
  isSelected?: boolean;
};

export type ReviewSummaryCardProps = {
  username: string;
  rating: number;
  reviewSummaryContent: string;
};

export type Review = {
  ticketReviewId: number;
  userName: string;
  profileImage: string;
  createdDate: string;
  watchSit: string;
  starRate: number;
  content: string;
  reviewImages: Array<{ imageUrl: string }>;
  placeReviews: Array<{
    placeCategoryId: number;
    categoryName: string;
  }>;
  tagReviews: Array<{
    tagCategoryId: number;
    tagName: string;
    iconUrl: string;
  }>;
};

export type OrederByType = "HIGH_RATE" | "LOW_RATE" | "RECENT";

export type GetConcertReviewListProps = {
  concertId: number;
  page: number;
  size: number;
  orderBy: OrederByType;
};

export type GetConcertReviewListResponse = {
  code: string;
  message: string;
  result: {
    totalPage: number;
    currentPage: number;
    size: number;
    reviewList: Review[];
  };
  refreshed: boolean;
};

export type GetConcertReviewDetailResponse = {
  code: string;
  message: string;
  result: Review;
  refreshed: boolean;
};

export type GetConcertReviewInfiniteResponse = {
  pageParams: number[];
  pages: GetConcertReviewListResponse[];
};

export type ReviewCardProps = {
  review: Review;
  onClick: () => void;
};

export type TicketReviewRequest = {
  ticketReviewId?: number;
  concertId: number;
  clacoBookId?: number;
  watchDate: string;
  watchRound: string;
  watchSit: string;
  starRate: number;
  casting: string;
  content: string;
  placeReviewIds: PlaceCategory[];
  tagCategoryIds: TagCategory[];
  files: File[];
};

export type TicketReviewResponse = {
  code: string;
  message: string;
  result: TicketReviewRequest;
  refreshed: boolean;
};

export type TicketReviewDetailRequest = {
  ticketReviewId: number;
  concertName: string;
  nickname: string;
  watchDate: string;
  createdDate: string;
  watchPlace: string;
  watchRound: string;
  runningTime: string;
  castings: string;
  watchSit: string;
  ticketImage: string;
  concertTags: TagCategory[];
  starRate: number;
  content: string;
  genreName: string;
  concertState: string;
  placeReviews: PlaceCategory[];
  imageUrlS: Array<{ imageUrl: string }>;
  editor: boolean;
};

export type TicketReviewDetailResponse = {
  code: string;
  message: string;
  result: TicketReviewDetailRequest;
  refreshed: boolean;
};
