export type GenreProps = {
  genreImgURL?: string;
  genreKeyword: string;
  className?: string;
  size?: number;
  isShow?: boolean;
};

export type GenreType = {
  type: string;
  content: string;
};

export type GenreKeyword =
  | "웅장한"
  | "섬세한"
  | "고전적인"
  | "현대적인"
  | "서정적인"
  | "역동적인"
  | "낭만적인"
  | "비극적인"
  | "친숙한"
  | "새로운";

export type GenreImageMap = {
  [K in GenreKeyword]: () => Promise<{ default: string }>;
};
