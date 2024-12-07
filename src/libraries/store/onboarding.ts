import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingState = {
  gender: string;
  setGender: (gender: string) => void;
  clearGender: () => void;

  age: number;
  setAge: (age: number) => void;
  clearAge: () => void;

  minPrice: number;
  setMinPrice: (minPrice: number) => void;
  clearMinPrice: () => void;

  maxPrice: number;
  setMaxPrice: (maxPrice: number) => void;
  clearMaxPrice: () => void;

  regionPreferences: string[];
  setRegionPreferences: (regions: string[]) => void;
  addRegionPreference: (region: string) => void;
  clearRegionPreferences: () => void;

  typePreferences: string[];
  setTypePreferences: (types: string[]) => void;
  addTypePreference: (type: string) => void;
  clearTypePreferences: () => void;

  categoryPreferences: string[];
  setCategoryPreferences: (categories: string[]) => void;
  addCategoryPreference: (category: string) => void;
  removeLastCategoryPreference: () => void;
  removeSpecificCategoryPreference: (category: string) => void;
  clearCategoryPreferences: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      gender: "",
      setGender: (gender) => set({ gender }),
      clearGender: () => set({ gender: "" }),

      age: 0,
      setAge: (age) => set({ age }),
      clearAge: () => set({ age: 0 }),

      minPrice: 0,
      setMinPrice: (minPrice) => set({ minPrice }),
      clearMinPrice: () => set({ minPrice: 0 }),

      maxPrice: 1000000,
      setMaxPrice: (maxPrice) => set({ maxPrice }),
      clearMaxPrice: () => set({ maxPrice: 1000000 }),

      regionPreferences: [],
      setRegionPreferences: (regions) => set({ regionPreferences: regions }),
      addRegionPreference: (region) =>
        set((state) => ({
          regionPreferences: [...state.regionPreferences, region],
        })),
      clearRegionPreferences: () => set({ regionPreferences: [] }),

      typePreferences: [],
      setTypePreferences: (types) => set({ typePreferences: types }),
      addTypePreference: (type) =>
        set((state) => ({
          typePreferences: [...state.typePreferences, type],
        })),
      clearTypePreferences: () => set({ typePreferences: [] }),

      categoryPreferences: [],
      setCategoryPreferences: (categories) =>
        set({ categoryPreferences: categories }),
      addCategoryPreference: (category) =>
        set((state) => ({
          categoryPreferences: [...state.categoryPreferences, category],
        })),
      removeLastCategoryPreference: () =>
        set((state) => ({
          categoryPreferences: state.categoryPreferences.slice(0, -1),
        })),
      removeSpecificCategoryPreference: (category: string) =>
        set((state) => ({
          categoryPreferences: state.categoryPreferences.filter(
            (item) => item !== category,
          ),
        })),
      clearCategoryPreferences: () => set({ categoryPreferences: [] }),
    }),
    {
      name: "user-onboarding-storage",
    },
  ),
);
