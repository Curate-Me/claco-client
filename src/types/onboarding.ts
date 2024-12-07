export type GenderProps = {
  selectedGender: string | null;
  onGenderSelect: (gender: string) => void;
};

export type AgeProps = {
  selectedAge: number | null;
  onAgeSelect: (age: number) => void;
};

export type NicknameProps = {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  setNickname: (value: string) => void;
};

export type PriceProps = {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
};

export type LocationProps = {
  selectedLocation: string[];
  onLocationFilterClick?: (value: string[], label: string) => void;
  onLocationClick?: (location: string) => void;
  isFilter?: boolean;
};

export type ConceptProps = {
  selectedConcept: string[];
  onConceptClick: (concept: string) => void;
};

export type FeatureType = {
  title: string;
  description: string[];
  image: string;
};
