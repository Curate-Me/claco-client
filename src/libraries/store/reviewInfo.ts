import { create } from "zustand";

export type ReviewInfo = {
  starRate: number;
  content: string;
};

export type ReviewInfoState = {
  data: ReviewInfo;
  setReviewInfo: (data: ReviewInfo) => void;
  clearReviewInfo: () => void;
};

export const useReviewInfoStore = create<ReviewInfoState>()((set) => ({
  data: {
    starRate: 0,
    content: "",
  },
  setReviewInfo: (data) => set({ data }),
  clearReviewInfo: () =>
    set({
      data: {
        starRate: 0,
        content: "",
      },
    }),
}));
