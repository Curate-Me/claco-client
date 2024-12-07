import { create } from "zustand";

export type ConcertInfo = {
  genrenm: string;
  prfstate: string;
  prfnm: string;
};

export type ConcertInfoState = {
  data: ConcertInfo;
  setConcertInfo: (data: ConcertInfo) => void;
  clearConcertInfo: () => void;
};

export const useConcertInfoStore = create<ConcertInfoState>()((set) => ({
  data: {
    genrenm: "",
    prfstate: "",
    prfnm: "",
  },
  setConcertInfo: (data) => set({ data }),
  clearConcertInfo: () =>
    set({
      data: {
        genrenm: "",
        prfstate: "",
        prfnm: "",
      },
    }),
}));
