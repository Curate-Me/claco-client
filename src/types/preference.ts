export type SettingsProps = {
  onBack: () => void;
  onClick: () => void;
};

export type PreferRegion = {
  preferenceRegion: string;
};

export type PreferCategory = {
  preferenceCategory: string;
};

export type PreferType = {
  preferenceType: string;
};

export type UserPreferenceResult = {
  gender: string;
  age: number;
  minPrice: number;
  maxPrice: number;
  preferRegions: PreferRegion[];
  preferCategories: PreferCategory[];
  preferTypes: PreferType[];
};

export type UserPreferencesResponse = {
  code: string;
  message: string;
  result: UserPreferenceResult;
};

export type UserPreferencesPutRequest = {
  gender: string;
  age: number;
  minPrice: number;
  maxPrice: number;
  regionPreferences: PreferRegion[];
  typePreferences: PreferType[];
};

export type UserPreferencesPutResponse = {
  code: string;
  message: string;
  result: UserPreferenceResult;
  refreshed: boolean;
};

export type UserBased = {
  id: number;
  prfnm: string;
  poster: string;
  genrenm: string;
  liked: boolean;
};

export type UserBasedResponse = {
  code: string;
  message: string;
  result: UserBased[];
  refreshed: boolean;
};

export type ConcertCard = {
  id: number;
  prfnm: string;
  poster: string;
  genrenm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
};

export type UserItemBased = {
  keywords: string[];
  likedHistory: boolean;
  recommendationConcertsResponseV1s: ConcertCard[];
};

export type UserItemBasedResponse = {
  code: string;
  message: string;
  result: UserItemBased;
  refreshed: boolean;
};

export type TicketInfoResponse = {
  id: number;
  ticketImage: string;
};

export type TicketReviewSummary = {
  nickName: string;
  concertName: string;
  concertId: number;
  createdAt: string;
  content: string;
};

export type UserRecClacoTicket = {
  ticketInfoResponse: TicketInfoResponse;
  ticketReviewSummary: TicketReviewSummary;
};

export type UserRecClacoTicketResponse = {
  code: string;
  message: string;
  result: UserRecClacoTicket[];
  refreshed: boolean;
};
