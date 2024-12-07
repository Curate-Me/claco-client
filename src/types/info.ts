export type UserInfoResult = {
  nickname: string;
  imageUrl: string;
};

export type UserInfoRequest = {
  updateNickname?: string;
  updateImage?: File | null;
};

export type UserInfoResponse = {
  code: string;
  message: string;
  result: UserInfoResult;
  refreshed: boolean;
};
