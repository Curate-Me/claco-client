import { ReactComponent as Majestic } from "@/assets/svgs/Genre/Majestic.svg";
import { ReactComponent as Delicate } from "@/assets/svgs/Genre/Delicate.svg";

import { ReactComponent as Lyrical } from "@/assets/svgs/Genre/Lyrical.svg";

import { ReactComponent as Romantic } from "@/assets/svgs/Genre/Romantic.svg";
import { ReactComponent as Tragic } from "@/assets/svgs/Genre/Tragic.svg";

import { ReactComponent as Familiar } from "@/assets/svgs/Genre/Familiar.svg";
import { ReactComponent as Fresh } from "@/assets/svgs/Genre/Fresh.svg";

import { GenreProps, GenreType } from "@/types/genre";

const GENRE: GenreType[] = [
  { type: "Majestic", content: "웅장한" },
  { type: "Delicate", content: "섬세한" },

  { type: "Classical", content: "고전적인" },
  { type: "Modern", content: "현대적인" },

  { type: "Lyrical", content: "서정적인" },
  { type: "Dynamic", content: "역동적인" },

  { type: "Romantic", content: "낭만적인" },
  { type: "Tragic", content: "비극적인" },

  { type: "Familiar", content: "친숙한" },
  { type: "Fresh", content: "새로운" },
];

export const Genre = ({ genreType, className, size = 48 }: GenreProps) => {
  const genreLogo = () => {
    switch (genreType) {
      case "Majestic":
        return <Majestic width={size} height={size} viewBox="0 0 48 48" />;
      case "Delicate":
        return <Delicate width={size} height={size} viewBox="0 0 48 48" />;
      case "Classical":
        return <Lyrical width={size} height={size} viewBox="0 0 48 48" />;
      case "Modern":
        return <Lyrical width={size} height={size} viewBox="0 0 48 48" />;
      case "Lyrical":
        return <Lyrical width={size} height={size} viewBox="0 0 48 48" />;
      case "Dynamic":
        return <Lyrical width={size} height={size} viewBox="0 0 48 48" />;
      case "Romantic":
        return <Romantic width={size} height={size} viewBox="0 0 48 48" />;
      case "Tragic":
        return <Tragic width={size} height={size} viewBox="0 0 48 48" />;
      case "Familiar":
        return <Familiar width={size} height={size} viewBox="0 0 48 48" />;
      case "Fresh":
        return <Fresh width={size} height={size} viewBox="0 0 48 48" />;
      default:
        return null; // 또는 기본 아이콘을 반환할 수 있습니다
    }
  };

  const genreContent = () => {
    return GENRE.filter((genre) => genre.type === genreType)[0].content;
  };

  return (
    <div
      className={`flex-col items-center justify-center inline-block space-y-2 text-center text-common-white body2-medium ${className}`}
    >
      <span className="flex justify-center">{genreLogo()}</span>
      <div>{genreContent()}</div>
    </div>
  );
};
