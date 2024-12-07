import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
  nickname: string;
  setNickname: (nickname: string) => void;
  clearNickname: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      nickname: "",
      setNickname: (nickname) => set({ nickname }),
      clearNickname: () => set({ nickname: "" }),
    }),
    {
      name: "user-storage",
    }
  )
);
