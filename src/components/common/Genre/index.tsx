import { cn } from "@/lib/utils";
import { GenreImageMap, GenreKeyword, GenreProps } from "@/types/genre";
import { Suspense, useEffect, useState } from "react";

const GENRE_IMAGE_MAP: GenreImageMap = {
  웅장한: () => import("@/assets/images/Genre/grand.png"),
  섬세한: () => import("@/assets/images/Genre/delicate.png"),
  고전적인: () => import("@/assets/images/Genre/classical.png"),
  현대적인: () => import("@/assets/images/Genre/modern.png"),
  서정적인: () => import("@/assets/images/Genre/lyrical.png"),
  역동적인: () => import("@/assets/images/Genre/dynamic.png"),
  낭만적인: () => import("@/assets/images/Genre/romantic.png"),
  비극적인: () => import("@/assets/images/Genre/tragic.png"),
  친숙한: () => import("@/assets/images/Genre/familiar.png"),
  새로운: () => import("@/assets/images/Genre/novel.png"),
};

const defaultImage = () => import("@/assets/images/Genre/classical.png");

const isGenreKeyword = (keyword: string): keyword is GenreKeyword => {
  return Object.keys(GENRE_IMAGE_MAP).includes(keyword);
};

export const Genre = ({
  genreImgURL,
  genreKeyword,
  className,
  isShow = false,
}: GenreProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (isGenreKeyword(genreKeyword)) {
          const imageModule = await GENRE_IMAGE_MAP[genreKeyword]();
          setImageSrc(imageModule.default);
        } else {
          const defaultImageModule = await defaultImage();
          setImageSrc(defaultImageModule.default);
        }
      } catch (error) {
        console.error("Error loading image:", error);
        const defaultImageModule = await defaultImage();
        setImageSrc(defaultImageModule.default);
      }
    };

    loadImage();
  }, [genreKeyword]);

  return (
    <div
      className={`flex-col items-center justify-center inline-block space-y-2 text-center ${className}`}
    >
      <Suspense
        fallback={
          <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
        }
      >
        {imageSrc && (
          <img
            src={genreImgURL ?? imageSrc}
            alt={`${genreKeyword} 공연 성격 키워드 이미지`}
            className={cn(`w-12 h-12 object-contain`, className)}
            loading="lazy"
          />
        )}
      </Suspense>
      {!isShow && (
        <div className={cn(`text-common-white body2-medium`, className)}>
          {genreKeyword}
        </div>
      )}
    </div>
  );
};
